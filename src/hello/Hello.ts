class Hello {
	private readonly message: string;
	constructor(message: string) {
		this.message = message;
	}
	public getMessage(): string {
		return this.message;
	}
}

export default Hello;
