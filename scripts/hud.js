import { News } from "./news.js";

const Content = document.getElementById("Content");

News.forEach(Page => {
    const PageTitle = Page.Title;
    const PageContent = Page.Content;

    const Viewpage = document.createElement("viewpage");
    Content.appendChild(Viewpage);

    const TitleLabel = document.createElement("span");
    TitleLabel.innerHTML = PageTitle;
    Viewpage.appendChild(TitleLabel);
    
    const ContentParagraph = document.createElement("p");
    ContentParagraph.innerHTML = PageContent;
    Viewpage.appendChild(ContentParagraph);

    Viewpage.addEventListener("click", Page.Click);
});