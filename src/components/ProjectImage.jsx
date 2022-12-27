import Image from "next/image";

export default function ProjectImage({ src, alt }) {
  return (
    <div className="relative">
      <div className="imageContainer">
        <Image src={src} alt={alt} fill responsive className={`imageItem`} />
      </div>
    </div>
  );
}
