import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <>
    <span style={{ fontSize: '2em', color: '#555', display: 'inline-block', textShadow: '1px 1px 20px #999' }}>Chat with your own AI</span>
    <TypeAnimation
      sequence={[
        'Built with Gemini AI',
        2000,
        'Your own customized ChatGPT',
        5000
      ]}
      wrapper="div"
      speed={50}
      style={{ fontSize: '2em', color: '#555', display: 'inline-block', textShadow: '1px 1px 20px #999' }}
      repeat={Infinity}
      preRenderFirstString={true}
    />
    </>
  );
};

export default TypingAnimation;