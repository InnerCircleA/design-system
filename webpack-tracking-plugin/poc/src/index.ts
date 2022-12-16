import printMe from "./print";
import { here } from "./here";

// NOTE: 이 함수가 있으면 여기가 페이지임을 나타낼 수 있습니다.
here("여기가 컴포넌트 수집 Root입니다.");

function component() {
    const element = document.createElement("div");

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

// const reactElement = React.createElement('div', {}, []);
// ReactDOM.render(reactElement, document.getElementById('app'))
