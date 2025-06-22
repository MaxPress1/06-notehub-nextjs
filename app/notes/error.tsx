"use client";

type ErrorProps = {
  error: Error | null;
};

export default function error({ error }: ErrorProps) {
  return <p>Could not fetch the list of notes. {error?.message}</p>;
}
