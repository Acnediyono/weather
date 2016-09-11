import {Image} from './image.model';
import {DisplayLocation} from './display-location.model';

export class Weather {
	private image: Image;
	private displayLocation: DisplayLocation;

	get image() {return this.image}
	get displayLocation() {return this.displayLocation}

	set image(p_image: Image) {this.image = p_image}
	set displayLocation(p_displayLocation: DisplayLocation) {this.displayLocation = p_displayLocation}
}