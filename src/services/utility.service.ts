export class Utility {
	// sorting utility to sort weather object
	public static sort(p_object: any, p_key: string, p_asc?: boolean) {
		let v_asc: boolean = p_asc === undefined ? true : p_asc;
		return p_object.sort(function (a, b) {
			if (typeof a[p_key] === 'number') {
				return v_asc ? a[p_key] - b[p_key] : b[p_key] - a[p_key];
			}else if(typeof a[p_key] === 'string') {
				let v_a = a[p_key].toLowerCase();
				let v_b = b[p_key].toLowerCase();
				if(v_a < v_b) return v_asc ? -1 : 1;
				if(v_a > v_b) return v_asc ? 1 : 1;
				return 0;
			}
		});
	}
}