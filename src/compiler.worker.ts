// @ts-ignore
import init, { string_bytes, compile_svg, compile_pdf } from '../renderer/pkg/renderer'
import { WorkerCommand } from './types';

init().then(() => {
   console.log('init wasm');
});

onmessage = function (e: MessageEvent<WorkerCommand>) {
   if ("format" in e.data && string_bytes != undefined) {
      let bytes = string_bytes(e.data.json);
      let data = `#makeresume(json.decode(bytes((${bytes.join(",")}))))\n`;
      let color = e.data.dark ? e.data.template.dark : e.data.template.white
      if (e.data.format == "svg") {
         postMessage({ type: 'svg', res: compile_svg(color + e.data.template.style + data) });
      }
      else if (e.data.format == "pdf") {
         postMessage({ type: 'pdf', res: compile_pdf(e.data.template.white + e.data.template.style + data) });
      }
   }
}