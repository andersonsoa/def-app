console.log("initilizing worker");

onmessage = ({ data }) => {
  if (data.type === "start") {
    let header = [];
    let total = 0;
    data.file
      .stream()
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            const lines = chunk.trimEnd().split("\n");

            for (const lineIdx in lines) {
              if (total === 0) {
                header = lines[lineIdx].split(",");
                postMessage({ type: "updateHeader", header });
                total++;
                continue;
              }
              controller.enqueue(lines[lineIdx]);
            }
          },
        }),
      )
      .pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            const data = chunk
              .split(",")
              .map((str) => str.trim().replace(/\//, ""));
            const obj = {};
            for (const lineIdx in data) {
              const h = header[lineIdx];
              obj[h] = data[lineIdx];
            }

            controller.enqueue(JSON.stringify(obj));
          },
        }),
      )
      .pipeTo(
        new WritableStream({
          write(chunk) {
            postMessage({ type: "line", line: JSON.parse(chunk) });
          },
        }),
      );
  }
};
