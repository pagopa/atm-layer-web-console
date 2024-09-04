export type BankRequest = {
		acquirerId: string;
		denomination: string;
		limit: string;
		period: string | null;
		rateLimit: string;
};