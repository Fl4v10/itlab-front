export class AbortableHttp {
	constructor(private readonly signal?: AbortSignal) {}

	fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
		// init = defaults({}, init, { signal: this.signal });
		return fetch(url, init);
	}

	/**
	 * Invokes the URL with a POST (by default), serializing the body as JSON and setting the correct content-type
	 * @param url
	 * @param body
	 * @param init
	 */
	invoke(url: string, body: object, init?: RequestInit) {
		init = init || {};
		const headers = new Headers(init.headers);
		if (!headers.has("Content-type")) {
			headers.set("Content-type", "application/json");
		}

		return this.fetch(url, {
			method: "POST",
			...init,
			body: JSON.stringify(body),
			headers
		});
	}
}
