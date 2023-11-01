// @ts-ignore
import { WorkerCommand } from './types';
import { addFont, setSource, renderSvgMerged, renderPdf } from '@djakish/render-typst';
import inter_bold from '../src/assets/fonts/Inter-Bold.ttf'
import inter_extra_bold from '../src/assets/fonts/Inter-ExtraBold.ttf'
import inter_regular from '../src/assets/fonts/Inter-Regular.ttf'
import lin_r from '../src/assets/fonts/LinBiolinum_R.ttf'
import lin_rb from '../src/assets/fonts/LinBiolinum_RB.ttf'
import lin_ri from '../src/assets/fonts/LinBiolinum_RI.ttf'
import newcmm from '../src/assets/fonts/NewCMMath-Book.otf'


await addFont(inter_bold)
await addFont(inter_extra_bold)
await addFont(inter_regular)
await addFont(lin_r)
await addFont(lin_rb)
await addFont(lin_ri)
await addFont(newcmm)

function stringToBytes(val: string) { 
   const result = []; 
   for (let i = 0; i < val.length; i++) { 
       result.push(val.charCodeAt(i)); 
   } 
   return result; 
} 

onmessage = function (e: MessageEvent<WorkerCommand>) {
   if ("format" in e.data) {
      let bytes = stringToBytes(e.data.json)
      let data = `#makeresume(json.decode(bytes((${bytes.join(",")}))))\n`;
      let color = e.data.dark ? e.data.template.dark : e.data.template.white
      if (e.data.format == "svg") {
         setSource(color + e.data.template.style + data)
         postMessage({ type: 'svg', res: renderSvgMerged() });
      }
      else if (e.data.format == "pdf") {
         setSource(e.data.template.white + e.data.template.style + data)
         postMessage({ type: 'pdf', res: renderPdf() });
      }
   }
}