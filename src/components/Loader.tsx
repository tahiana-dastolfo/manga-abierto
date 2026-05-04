import styled from "styled-components";

interface LoaderProps { size?: number; }
interface SpanProps { $size: number; }

const Loader = ({ size = 0.15 }: LoaderProps) => (
  <Span className="loader" $size={size} />
);
export default Loader;

const s = (base: number) => ({ $size }: SpanProps) => `${base * $size}px`;

const Span = styled.div<SpanProps>`
  width: ${s(200)};
  height: ${s(140)};
  background: #000000;
  box-sizing: border-box;
  position: relative;
  border-radius: ${s(8)};
  perspective: 1000px;
  margin: auto;

  &::before {
    content: '';
    position: absolute;
    left: ${s(10)};
    right: ${s(10)};
    top: ${s(10)};
    bottom: ${s(10)};
    border-radius: ${s(8)};
    background: #FFB347 no-repeat;
    background-size: ${s(60)} ${s(10)};
    background-image:
      linear-gradient(#000000 ${s(100)}, transparent 0),
      linear-gradient(#000000 ${s(100)}, transparent 0),
      linear-gradient(#000000 ${s(100)}, transparent 0),
      linear-gradient(#000000 ${s(100)}, transparent 0),
      linear-gradient(#000000 ${s(100)}, transparent 0),
      linear-gradient(#000000 ${s(100)}, transparent 0);
    background-position:
      ${s(15)} ${s(30)},
      ${s(15)} ${s(60)},
      ${s(15)} ${s(90)},
      ${s(105)} ${s(30)},
      ${s(105)} ${s(60)},
      ${s(105)} ${s(90)};
    box-shadow: 0 0 ${s(10)} rgba(0,0,0,0.25);
  }

  &::after {
    content: '';
    position: absolute;
    width: calc(50% - ${s(10)});
    right: ${s(10)};
    top: ${s(10)};
    bottom: ${s(10)};
    border-radius: ${s(8)};
    background: #c0392b no-repeat;
    background-size: ${s(60)} ${s(10)};
    background-image:
      linear-gradient(#5a0f0f ${s(100)}, transparent 0),
      linear-gradient(#5a0f0f ${s(100)}, transparent 0),
      linear-gradient(#5a0f0f ${s(100)}, transparent 0);
    background-position:
      50% ${s(30)},
      50% ${s(60)},
      50% ${s(90)};
    transform: rotateY(0deg);
    transform-origin: left center;
    animation: paging 1s linear infinite;
  }

  @keyframes paging {
    to { transform: rotateY(-180deg); }
  }
`;