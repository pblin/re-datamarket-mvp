export class AppLink {
  title: string;
  url: string;
  icon: any; //TODO: set to JSX element

  constructor(title: string, url: string, icon: any = undefined) {
    this.title = title;
    this.url = url;
    this.icon = icon;
  }
}
