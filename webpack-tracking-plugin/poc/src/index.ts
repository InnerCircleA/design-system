import printMe from "./print";
import { here } from "./here"; 
// import _ from "lodash";

// _.VERSION;

// NOTE: 이 함수가 있으면 여기가 페이지임을 나타낼 수 있습니다.
here("메인 테스트 모듈"); 
function component() {
    const element = document.createElement("div");

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
