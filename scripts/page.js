import { Pages } from "./pages.js";

const Content = document.getElementById("Content");
const Favicon = document.getElementById("Favicon");

Pages.forEach(Page => {
    const PageTimestamp = Page.Timestamp;
    const PageTitle = Page.Title;
    const PageContent = Page.Content;
    const PageLongContent = Page.LongContent;

    const Images = Page.Images;

    const Viewpage = document.createElement("viewpage");
    Viewpage.setAttribute("focused", "false");
    Viewpage.style.position = "relative";
    Content.appendChild(Viewpage);

    const TitleLabel = document.createElement("span");
    TitleLabel.innerHTML = PageTitle;
    Viewpage.appendChild(TitleLabel);
 
    const ContentParagraph = document.createElement("p");
    ContentParagraph.innerHTML = PageContent;
    Viewpage.appendChild(ContentParagraph);

    const TimestampLabel = document.createElement("pt");
    TimestampLabel.innerHTML = PageTimestamp;
    Viewpage.appendChild(TimestampLabel);

    const LongContentParagraph = document.createElement("pr");
    LongContentParagraph.innerHTML = PageLongContent;
    LongContentParagraph.style.opacity = "0";
    Viewpage.appendChild(LongContentParagraph);

    TitleLabel.addEventListener("click", Page.Click);

    if (Images.length > 0) {
        Images.forEach(ImageLink => {
            const Image = document.createElement("img");
            Image.src = ImageLink;
            Image.style.opacity = "0";
            Viewpage.appendChild(Image);
        });
    }

    Viewpage.addEventListener("click", function() {
        const Focused = this.getAttribute("focused") === "false";

        this.style.position = Focused ? "absolute" : "relative";
        this.style.height = Focused ? "100%" : "50%";
        this.setAttribute("focused", Focused);
        LongContentParagraph.style.opacity = Focused ? "1" : "0";
        TimestampLabel.style.opacity = Focused ? "0" : "1";

        Array.from(Content.getElementsByTagName("viewpage")).forEach(OtherViewpage => {
            if (OtherViewpage !== this) {
                OtherViewpage.setAttribute("focused", "false");
                OtherViewpage.style.display = Focused ? "none" : "block";
            }
        }); 

        Array.from(this.getElementsByTagName("img")).forEach(Image => {
            Image.style.opacity = Focused ? "1" : "0";
        });

        const AnyFocused = Array.from(Content.getElementsByTagName("viewpage")).some(Viewpage => Viewpage.getAttribute("focused") === "true");
        document.title = !AnyFocused ? "Küm Studios" : PageTitle;
        Favicon.href = !AnyFocused ? "../images/Favicon.png" : "../images/PageFavicon.png";
    });
});