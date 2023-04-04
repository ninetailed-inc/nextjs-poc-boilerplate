// TODO: Make me cool

import Image from "next/image";

export function MyComponent({ fields }) {
  return (
    <>
      <p>{fields.title}</p>
      <p>{fields.highlightText}</p>
      <p>{fields.body}</p>
      <p>{fields.alignment}</p>
      <Image
        src={`https://${fields.image.fields.file.url}`}
        width="400"
        height="300"
        alt={fields.image.fields.title}
      />
      <p>{JSON.stringify(fields.nt_experiences, null, 2)}</p>
    </>
  );
}
