import {IModel} from '../model/imodel';

export interface IDAO {
	insert(p_data_model: IModel);
	update(p_data_model: IModel);
	delete(p_data_model: IModel);
}