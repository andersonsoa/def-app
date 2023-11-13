"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

export default function ProcessarPage() {
  const workerRef = useRef<Worker>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  const [parsedCsv, setParsedCsv] = useState<Record<string, string>[]>([]);
  const [csvHeader, setCsvHeader] = useState<string[]>([]);

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });

    workerRef.current.addEventListener("message", ({ data }) => {
      if (data.type === "updateHeader") {
        setCsvHeader(data.header);
      }

      if (data.type === "line") {
        setParsedCsv((c) => [...c, data.line]);
      }
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  function handleProcess() {
    const files = fileRef.current?.files;
    if (files) {
      setParsedCsv([]);
      workerRef.current?.postMessage({
        type: "start",
        file: files[0],
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label>
        <input ref={fileRef} type="file" className="text-sm" accept=".csv" />
      </label>

      <label>
        <p className="text-zinc-500 text-sm">Buscar por:</p>
        <input
          type="text"
          className="px-2 py-1 w-full"
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
        />
      </label>

      <progress className="w-full" value={0} max={100}></progress>

      <button
        className="h-10 bg-zinc-300 hover:bg-zinc-400"
        onClick={handleProcess}
      >
        Processar
      </button>

      {parsedCsv.length !== 0 ? (
        <TableVirtuoso
          style={{ height: "100%" }}
          data={parsedCsv}
          components={{
            Table: (args) => <table className="w-full bg-zinc-300" {...args} />,
            TableHead: ({ style, ...rest }) => (
              <thead {...rest} style={style} />
            ),
          }}
          fixedHeaderContent={() => (
            <tr className="bg-black text-white">
              {csvHeader.map((h, idx) => (
                <th
                  key={idx + "header"}
                  align="center"
                  className={idx === 0 ? "w-[160px] p-2" : "p-2"}
                >
                  {h}
                </th>
              ))}
            </tr>
          )}
          itemContent={(idx, field) => (
            <>
              {Object.values(field).map((f, idx) => (
                <td align="center" className="p-2" key={f + idx}>
                  {f}
                </td>
              ))}
            </>
          )}
        />
      ) : null}
    </div>
  );
}
