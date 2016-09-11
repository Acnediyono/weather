export class Image {
	private url: string;
	private title: string;
	private link: string;

	public get url() { return this.url}
	public get title() {return this.title}
	public get link() {return this.link}

	public set url(p_url: string) {this.url = p_url}
	public set title(p_title: string) {this.title = p_title}
	public set link(p_link: string) {this.link = p_link}
}