export interface Repo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	updated_at: string;
	private: boolean;
}

export const mockRepos: Repo[] = [
	{
		id: 1,
		name: "dev-inspector-ai",
		full_name: "orlando/dev-inspector-ai",
		description:
			"Plataforma SaaS de automatización de auditorías de software con agente interactivo",
		html_url: "https://github.com/orlando/dev-inspector-ai",
		language: "TypeScript",
		stargazers_count: 128,
		forks_count: 34,
		updated_at: "2026-05-20T10:30:00Z",
		private: false,
	},
	{
		id: 2,
		name: "next-ecommerce",
		full_name: "orlando/next-ecommerce",
		description: "E-commerce platform built with Next.js and Stripe",
		html_url: "https://github.com/orlando/next-ecommerce",
		language: "TypeScript",
		stargazers_count: 89,
		forks_count: 23,
		updated_at: "2026-05-18T08:15:00Z",
		private: false,
	},
	{
		id: 3,
		name: "rust-cli-tools",
		full_name: "orlando/rust-cli-tools",
		description: "Collection of CLI tools written in Rust",
		html_url: "https://github.com/orlando/rust-cli-tools",
		language: "Rust",
		stargazers_count: 56,
		forks_count: 12,
		updated_at: "2026-05-15T14:20:00Z",
		private: true,
	},
	{
		id: 4,
		name: "ml-pipeline",
		full_name: "orlando/ml-pipeline",
		description:
			"End-to-end machine learning pipeline with Python and TensorFlow",
		html_url: "https://github.com/orlando/ml-pipeline",
		language: "Python",
		stargazers_count: 234,
		forks_count: 67,
		updated_at: "2026-05-22T16:45:00Z",
		private: false,
	},
	{
		id: 5,
		name: "go-microservices",
		full_name: "orlando/go-microservices",
		description: "Microservices architecture example in Go",
		html_url: "https://github.com/orlando/go-microservices",
		language: "Go",
		stargazers_count: 345,
		forks_count: 89,
		updated_at: "2026-05-21T11:00:00Z",
		private: false,
	},
	{
		id: 6,
		name: "react-component-library",
		full_name: "orlando/react-component-library",
		description: "Production-ready React component library with Storybook",
		html_url: "https://github.com/orlando/react-component-library",
		language: "TypeScript",
		stargazers_count: 67,
		forks_count: 15,
		updated_at: "2026-05-19T09:30:00Z",
		private: false,
	},
	{
		id: 7,
		name: "personal-website",
		full_name: "orlando/personal-website",
		description: null,
		html_url: "https://github.com/orlando/personal-website",
		language: "HTML",
		stargazers_count: 12,
		forks_count: 5,
		updated_at: "2026-04-10T10:00:00Z",
		private: false,
	},
	{
		id: 8,
		name: "infra-terraform",
		full_name: "orlando/infra-terraform",
		description: "Infrastructure as Code with Terraform and AWS",
		html_url: "https://github.com/orlando/infra-terraform",
		language: "HCL",
		stargazers_count: 34,
		forks_count: 8,
		updated_at: "2026-05-12T07:00:00Z",
		private: true,
	},
];
