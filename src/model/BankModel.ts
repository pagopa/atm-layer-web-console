export type BankRequest = {
		acquirerId: string;
		denomination: string;
		limit: string;
		period: string | null;
		burstLimit: string;
		rateLimit: string;
};