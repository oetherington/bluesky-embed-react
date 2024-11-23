import { AtpAgent } from "@atproto/api";

const agents = new Map<string, AtpAgent>();

export const useBlueskyClient = (
	service: string = "https://bsky.social",
): AtpAgent => {
	let agent = agents.get(service);
	if (agent) {
		return agent;
	}
	agent = new AtpAgent({ service });
	agents.set(service, agent);
	return agent;
}
