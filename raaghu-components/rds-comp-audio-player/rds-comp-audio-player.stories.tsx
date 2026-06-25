import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';
import RdsCompAudioPlayer from './rds-comp-audio-player';

const meta: Meta<typeof RdsCompAudioPlayer> = {
    title: "Components/Audio Player",
    component: RdsCompAudioPlayer,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Audio Player** component is a customizable UI element designed for audio playback within your application. It supports multiple modes including standard playback, audio editing with waveform visualization, and a collapsed view. Key features include play/pause controls, skip forward/backward (10 seconds), volume control with vertical slider, playback speed settings, and a transcript viewer. The component provides audio editing capabilities with trim controls, zoom functionality, and time range selection. It also includes export options (audio, transcript, summary, mind map) and customizable appearance to match your design system. Ideal for podcasts, voice recordings, or any audio content management needs.'
    },
}
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
            type: {
                control: 'select',
                options: ['Audio Edition', 'Audio Player', 'Collapsed'],
                description: 'Select the audio player type',
            },
    },
} satisfies Meta<typeof RdsCompAudioPlayer>;

export default meta;

type Story = StoryObj<typeof RdsCompAudioPlayer>;

export const Default: Story = {
    args: {
        type: 'Audio Player',
        showSettings: true,
        showTranscript: true,
        showExport: true,
        showMoreOptions: true,
    }
    ,
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
};


