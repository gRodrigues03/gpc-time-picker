import {
    FrontendRendererArgs,
} from "@streamlit/component-v2-lib";

export default function onRender(args: FrontendRendererArgs): void {
    const { data, parentElement, setStateValue } = args;
    parentElement.className='emplinsel'

    const label = document.createElement("p");
    label.className = 'cc-label'
    label.textContent = data.label;
    parentElement.appendChild(label);

    const input = document.createElement("input")
    input.className = 'cc-input'
    input.value = data.default;
    parentElement.appendChild(input)

    input.addEventListener("change", function () {
        setStateValue('t', input.value);
    });

    input.addEventListener("input", (e) => {
        let t = e.currentTarget,
          n = t.selectionStart,
          a = t.value.replace(/\D/g, ""),
          i = a;
        a.length >= 3 && (i = a.slice(0, 2) + ":" + a.slice(2, 4)),
        i.length > t.value.length && n > 2 && n++,
        i.length < t.value.length && n > 2 && n--,
          (t.value = i.slice(0, 5)),
          t.setSelectionRange(n, n);
    });

    input.addEventListener("blur", (e) => {
        let [t, n] = e.currentTarget.value.split(":");
        t &&
        n &&
        ((t = Math.min(parseInt(t, 10), 23).toString().padStart(2, "0")),
          (n = Math.min(parseInt(n, 10), 59).toString().padStart(2, "0")),
          (e.currentTarget.value = `${t}:${n}`));
    });

    input.addEventListener("paste", e => e.preventDefault());
}
