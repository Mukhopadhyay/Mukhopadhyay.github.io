import type { Metadata } from "next";
import SynapseEmbed from "@/components/synapse/SynapseEmbed";
import { SYNAPSE_DESCRIPTION, SYNAPSE_TAGLINE } from "@/lib/synapse";

export const metadata: Metadata = {
  title: "Synapse",
  description: `${SYNAPSE_TAGLINE}. ${SYNAPSE_DESCRIPTION}`,
};

export default function SynapsePage() {
  return <SynapseEmbed />;
}
