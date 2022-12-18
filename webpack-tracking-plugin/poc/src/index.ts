import { DetailPage } from "./DetailPage";
import { MainPage } from "./MainPage";

function createExampleDOM() {
  const element = document.createElement("div");
  const pageWrapperElement = document.createElement("div");
  pageWrapperElement.appendChild(MainPage())

  const mainPageButton = document.createElement("button");
  mainPageButton.innerHTML = "Go Main Page";
  mainPageButton.onclick = () => {
    pageWrapperElement.replaceChildren(MainPage());
  };

  const detailPageButton = document.createElement("button");
  detailPageButton.innerHTML = "Go Detail Page";
  detailPageButton.onclick = () => {
    pageWrapperElement.replaceChildren(DetailPage());
  };

  element.appendChild(mainPageButton);
  element.appendChild(detailPageButton);
  element.appendChild(pageWrapperElement);

  return element;
}

document.body.appendChild(createExampleDOM());
