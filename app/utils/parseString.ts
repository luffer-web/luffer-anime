const parseString = (string: string): string => {
  let parsedString = string?.replaceAll(" ", "_").toLowerCase();
  parsedString = parsedString?.replaceAll(";", "%3B");
  const colonIndex = string?.indexOf(":");
  const apostropheIndex = string?.indexOf("'");
  if (colonIndex !== -1) {
    if (parsedString && parsedString[colonIndex + 1] !== " ") {
      parsedString?.replace(":", "_");
    } else {
      parsedString?.slice(0, colonIndex);
    }
  }
  if (apostropheIndex !== -1) {
    parsedString = parsedString?.slice(0, apostropheIndex);
  }

  return parsedString;
};

export { parseString };
