import {getProductsByCategory, getProductsByCategoryPaginated} from './src/utils/stripeHelpers';
import {StripeProductData} from './src/types/types';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import {categories} from '@/types/categories';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function getAllProducts(category: string): Promise<StripeProductData[]> {
  let allProducts: StripeProductData[] = [];

  let pageNumber = 1;
  const productsObj = await getProductsByCategoryPaginated(category, pageNumber);
  const products = productsObj.products;
  allProducts.push(...products);

  for (let i = pageNumber; i < productsObj.totalPages; i++) {
    const nextPageProductsObj = await getProductsByCategoryPaginated(category, i + 1);
    const nextPageProducts = nextPageProductsObj.products;
    allProducts.push(...nextPageProducts);
  }

  return allProducts;
}


async function exportProductImages() {
  try {
    console.log('Fetching all products from Stripe...');

    let allProducts: StripeProductData[] = []

    for (const category of categories) {
      console.log(`\nExporting images for category: ${category}`);
      const products = await getAllProducts(category);
      console.log(`Found ${products.length} products in category ${category}`);
      allProducts = allProducts.concat(products);
    }


    console.log(`Found ${allProducts.length} products`);

    // Create export directory
    const exportDir = path.join(process.cwd(), 'product-images-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, {recursive: true});
    }

    let imageCount = 0;
    const productList: Array<{name: string, id: string, images: string[]}> = [];

    for (const product of allProducts) {
      if (product.images && product.images.length > 0) {
        console.log(`\nProcessing: ${product.name} (${product.id})`);
        const productImages: string[] = [];

        for (let i = 0; i < product.images.length; i++) {
          const imageUrl = product.images[i];
          const ext = imageUrl.includes('.png') ? 'png' :
            imageUrl.includes('.jpg') || imageUrl.includes('.jpeg') ? 'jpg' :
              imageUrl.includes('.webp') ? 'webp' : 'jpg';

          // Create safe filename from product name and index
          const safeName = product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          const filename = `${safeName}_${product.id}_${i + 1}.${ext}`;
          const filepath = path.join(exportDir, filename);

          try {
            console.log(`  Downloading image ${i + 1}/${product.images.length}: ${filename}`);
            await downloadImage(imageUrl, filepath);
            productImages.push(filename);
            imageCount++;
          } catch (err) {
            console.error(`  Error downloading ${filename}:`, err);
          }
        }

        productList.push({
          name: product.name,
          id: product.id,
          images: productImages
        });
      }
    }

    // Create a manifest file
    const manifest = {
      exportDate: new Date().toISOString(),
      totalProducts: allProducts.length,
      totalImages: imageCount,
      products: productList
    };

    fs.writeFileSync(
      path.join(exportDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log(`\n✅ Export complete!`);
    console.log(`   Total products: ${allProducts.length}`);
    console.log(`   Total images downloaded: ${imageCount}`);
    console.log(`   Export location: ${exportDir}`);
    console.log(`   Manifest file: ${path.join(exportDir, 'manifest.json')}`);

  } catch (error) {
    console.error('Error exporting product images:', error);
    process.exit(1);
  }
}

exportProductImages();
