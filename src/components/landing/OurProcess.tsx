import HeaderText from "../text/HeaderText";
import SecondaryText from "../text/SecondaryText";


const OurProcess = () => {
    return (
        <div className="flex flex-col justify-center items-start text-left px-6 py-40">
            <HeaderText size='large'>
                Our Process
            </HeaderText>

            <div className='my-12 leading-loose sm:leading-[3rem] space-y-8 font-secHeading'>
                <SecondaryText size='large' className='font-secHeading'>
                    At Amber&apos;s Boutique, we take pride in our meticulous process of transforming vintage buttons and pendants into exquisite jewelry pieces. Our process begins with sourcing authentic vintage buttons, each carrying its own unique history and charm.

                    Once sourced, we carefully clean and restore each button, preserving its original beauty while preparing it for its new life as a piece of jewelry. We then design and craft each item with precision and care, ensuring that every piece of vintage jewelry we create is a timeless treasure.

                    Our commitment to quality and authenticity is unwavering. We believe that every piece of jewelry should tell a story, and our vintage jewelry does just that. From the streets of Paris to your jewelry box, our process ensures that you receive a piece of history, beautifully preserved and transformed.
                </SecondaryText>
            </div>
        </div>
    );
};

export default OurProcess;