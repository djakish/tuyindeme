import { createMutable, modifyMutable, produce } from 'solid-js/store';
import ResumeForm from './components/ResumeForm';
import TypstWorker from './compiler.worker?worker'
import { createSignal, onMount } from 'solid-js';
import { Resume, Template } from './types';
import { mizlan, skyzh } from './templates';

function App() {
  let typstWorker: Worker;

  let state = createMutable({
    name: "Your name",
    urls: [{ title: "github.com/typst/typst" }, { title: "Descriptions have eval" }],
    sections: [
      {
        name: "Work",
        items: [
          {
            title: "Cool company",
            rightTitle: "Remote",
            subTitle: "Software Engineer",
            rightSubTitle: "May 2020 - August 2023",
            description: "- Cool stuff you did \n"
          },
        ],
      },
      {
        name: "Education",
        items: [
          {
            title: "Your cool univeristy",
            rightTitle: "Astana",
            subTitle: "BS Software Engineering",
            rightSubTitle: "2020 - 2023",
            description: "- Cool stuff you learned"
          },
        ],
      },
      {
        name: "Personal projects",
        items: [
          {
            title: "No Code",
            rightTitle: "https://github.com/kelseyhightower/nocode",
            subTitle: "Tech Stack:",
            rightSubTitle: "",
            description: ""
          },
        ],
      },
      {
        name: "Skills",
        items: [
          {
            title: "",
            rightTitle: "",
            subTitle: "",
            rightSubTitle: "",
            description: "/ Programming languages: C\\#, TypeScript, Rust\n/ Spoken languages: English, Klingon"
          },
        ],
      },
    ]
  });

  onMount(async () => {
    if (window.Worker) {
      typstWorker = typstWorker instanceof Worker ? typstWorker : new TypstWorker()
    }
  });

  const render = async () => {
    if (window.Worker) {

      typstWorker = typstWorker instanceof Worker ? typstWorker : new TypstWorker()

      const json = JSON.stringify(state);
      typstWorker.postMessage({
        format: 'svg',
        json: json,
        template: template(),
        dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      });
      typstWorker.addEventListener('message', function (e) {
        if (e.data.type == 'svg') {
          const preview = document.getElementById("preview") as HTMLDivElement
          // I couldn't figure out how to set the style with typescript so this is how i did it
          const part2 = e.data.res.slice(22)
          const res = `<svg class="h-full w-full "` + part2;
          preview.innerHTML = res;
        }
      })
    }
  }

  const download = async () => {
    if (window.Worker) {
      typstWorker = typstWorker instanceof Worker ? typstWorker : new TypstWorker()

      const json = JSON.stringify(state);
      typstWorker.postMessage({
        format: 'pdf',
        json: json,
        template: template(),
      });

      typstWorker.addEventListener('message', function (e) {
        if (e.data.type == 'pdf') {
          var blob = new Blob([e.data.res], { type: 'application/pdf' });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "resume.pdf";
          link.click();
          link.remove();
        }
      })
    }
  }

  const importData = async (e: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      const json = JSON.parse(e.target?.result as string)
      deepUpdate(json)
    })

    if (e.target.files) {
      reader.readAsText(e.target.files[0])
    }
  }

  const deepUpdate = (json: Resume) => {
    modifyMutable(state, produce((state) => {
      state.name = json.name;
      state.urls = json.urls;
      state.sections = json.sections;
    }))
  }

  const exportData = async () => {
    const json = JSON.stringify(state);
    const blob = new Blob([json], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.json";
    link.click();
    link.remove();
  }

  const [template, setTemplate] = createSignal(skyzh);
  const toggle = (template: Template) => setTemplate(template)

  return (
    <section class="bg-secondary dark:bg-primary h-full min-h-screen font-mono w-full flex justify-center">
      <div class="md:w-1/2 w-full">
        <div class=" flex flex-col items-start space-y-4">
          <h1 class='heading-primary ml-4 mt-8'>
            RESUME BUILDER
          </h1>
          <section>
            <label for="files" class="ml-4 btn-primary dark:btn-primary-dark">Import Json</label>
            <input id="files" style="visibility:hidden;" type="file" accept="application/json" onChange={importData} />
          </section>
          {/* Template picker */}
          <section class='pt-4'>
            <button class={template() == skyzh ? "ml-4 btn-primary-dark dark:btn-primary" : "ml-4 btn-primary dark:btn-primary-dark"} onClick={[toggle, skyzh]}>skyzh</button>
            <button class={template() == mizlan ? "ml-4 btn-primary-dark dark:btn-primary" : "ml-4 btn-primary dark:btn-primary-dark"} onClick={[toggle, mizlan]}>mizlan</button>
          </section>
          <ResumeForm resume={state} />
        </div>
        <div>
          <div class='flex flex-row justify-between px-4 py-6'>
            <button class="btn-primary dark:btn-primary-dark" onClick={render}>Preview</button>
            <button class="btn-primary dark:btn-primary-dark" onClick={exportData}>Export JSON</button>
            <button class="btn-primary dark:btn-primary-dark" onClick={download}>Download PDF</button>
          </div>
          <div id="preview">
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
