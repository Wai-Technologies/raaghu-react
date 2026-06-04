import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsCompKanbanBoard from "./rds-comp-kanban-board";
import { boardInfo } from "./kanban-board-helpers";


const meta: Meta = { 
    title: "Components/Kanban Board",
    component: RdsCompKanbanBoard,
    parameters: {
        layout: 'padded',
    controls: {
    exclude: ['onSubCardOption', 'onCardOption', 'onAddQuestionSaveHandler', 'onSelectedTagsListChange', 'isIlliustrationSmall', 'illustration'],
    },

        docs: {
    description: {
        component: 
            'The **Kanban Board** component is a customizable UI element designed to display and manage tasks or items in a Kanban-style board format. It supports features such as dynamic card creation, sub-card management, and customizable actions for cards and sub-cards. The component uses a `boardData` array to define board items, with properties like `cardId`, `status`, `name`, `subCards`, and `actions`. This component is ideal for project management tools, task tracking systems, or any application requiring a visual workflow management interface. Fully customizable, the Kanban Board component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        noDataTitle: {
            table: { disable: true },
        },
        noDataHeaderTitle: {
            table: { disable: true },
        },
        onClick: {
            table: { disable: true },
        },
        addQuestionData: {
            table: { disable: true },
        },
    },
} satisfies Meta<typeof RdsCompKanbanBoard>;

const kanbanAvatarData = [
    { title: 'Jane Doe', subText: 'Developer', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { title: 'John Smith', subText: 'Designer', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },

];

const moreOptions : any[] = [
    {
        key: "Assign",
        value: "assign"
    },
    {
        key: "View",
        value: "view"
    },
    {
        key: "Delete",
        value: "delete"
    }
];

const moreCardOptions : any[] = [
    {
        key: "Edit",
        value: "edit"
    },
    {
        key: "Delete",
        value: "delete"
    }
];
const sampleItems: boardInfo[] = [
    {
        cardId: 1,
        status: "unassigned",
        name: "Board 1",
        subCardIndex: 0,
        colorType: "primary",
        actions: moreCardOptions,
        subCards: [
            {
                ticketId: "1",
                ticketPriority: "High",
                ticketQuestion: "Question 1",
                ticketDate: "12th Jun 2023",
                SubcardId: 0,
                assignedToName: "abc",
                assignedTo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAABFFBMVEX////I7f+U1PMAAAAAGDCw5v8ARWYAO1wndpXK7/+Y2Pb39/cAPmCQz+38/PzM8f+VlZWMyea54PPe3t7q6urS9/91dXWGwd3Jycmj3vrw8PAAAB6cnJwAFC2vr68nJydnZ2dagpV9tM4fHx/V1dUWFhZ2qsMAACMAN1sALVQ9PT1ZWVkvLy84Ul5Sd4mJiYkYIydHR0cfLTS9vb1mk6io0+YAMU8uQkwAJkEAABkAABEnOEBHZ3ZAXGkRGR2GqLmixNUAHEno9/6Tn6uXtLyutr8AJE0AY4coQFMjM0MaKDYxTF8WITQ6WXUqTmk/ZX5fnbpFdZG28P9ee5Vzg5VgeICAmKDE1+FQYnlFiKVWaHAAEEKE9pjPAAARPUlEQVR4nO2c+1/aOh/HLVdbLqWFUkBBi4JFBS+UeUNBt6Nzm3Kc2zzb+f//jydpkiZN01Ic8/zy5PU6O2436buf7yVpmmRl5f/lzUujUq61StW93Y0OLBu7e9VSq1auNP5bqtr6wd5+UlT29w7Wa/8JXbGxXdrdEkLRsrVb2m4U35Sr0qpuzKEiZaPaqrwVVq62KbZgWNnfrOXegKu8viu8/eHxBSzHh8Lf7q6X/zBXpRqQ67A/thynS4vjWON+AHC/+ieNul313axzcTlwuqZpaloBlAQs8AdNA//WdQaXFx3f9dXtP8RVqW6x9zmxIJWGifgC+CCddcJW2fojulUOWAueWIBKzOTjA3TWCWvZg6WzDRm/vxo7bSDWXC6XTTPbzviKiYXhUrkqe6wV46jFKcdadW+JsrVoWu0DuRbjQmxtp++1sdFaEldlk+rlmNrCWKhopkN121yKbNteBju22jG9S6ib1raOSVP7S0gg6172GnejuQoFRVESShRbd+xluPXf5Mp5uaLviP0L8NTTuq5LsiFL+mgEftDTdUWc5gomdbeD3+pLcyQmO4O2yMEKhbouSZKsqupo8vTwCMvD00RXVUmvC+G09oDItvcbaJUj4mGOyJB1XVdlWZJUdWplbu18BpV873Y20Q1Z1fW6yKQO8rajV8dBhfh+P+hhBQWYDWJBrlnGzvhK3n5wVBX+XlcCNbUusej+K9HKRPYx72HAiJIKqUAxRrPbfCZYeo9TwzW0FDBrwRwTJ3nV2KhC0qsVAEuDOyIu2Zjwenm65ScGvAr8lw6gWSTpvkK1Mq57GHCxOpELCvbQE3O5sj3L6EpZ5RwOOBvp5hdWrUGcv+uPSWhHwgUFExnSK7Zl4IeANvW1o3VJGCz4gpXDYMccmKJ7egFPe44QDKN5l8u6wqHhED1aKHkU8eD1yg8GBGPA1FmIh7EGnRgeGieb1sVjo+oi730l7GMcGMMFfCcGGFBtqtIqEoeGfa0UH2yIfcBhwQoJH5gxiAOWyT+oTCUpwbJpDr5P7MFkeUMAlhjJDJikTmKB+ewJ0ORRQoC2ETdAsfdbPsV0lgv4czYeGFBNlX0VfarhvHYUDww72aXJgqV9YJJheZJF5g34e1Y0gOZLu+blAq5WQ9eetJkWCrrqA5N1DyzrFB4j4fLPku+pVFa1QhsPdGsxyDZwvvCB+RWTjAmBsf+u1wv5aN242j6DFnDu2IhtSycKTJaeMYv9M51OK4XIBNKbqlIEmhPTnjguL5lenPcx2PQjttRDApDVFeXpNpzMdgy+PuNrBexqc+MTxeVFO9zHYMsjrFHerKddtHr7wQ4zaX7Gk/l9rX0RJz5rwUxWCIBJ6hR1mPaTCwYNqmjdx54tdrh8gExSGTKS1SKDAI8w+ixYoFVKlimkvQJ00/5+mj08Zmw+1fWCZBLbUWn9+aOOViAuNYl3Mkg2ccnyTj3NoAF3q9fBK0j3Z8Y/yu0FVQet0qcn8Rnx6p7bcq8YM/45EoARsoyW5gqAc4v5lMmyZIJG5BFzFzT63gofDyHJkkxcKiIwbM38Ew/maafUTYdGRE/YiEzHawUzGS0aHi4OGFvymYw8LyTrtYVkOCIUc0ZkE/oZSD2MPQfRg0g0+DmmGUOQMHCj7h3r4WSudE92FJkvdbSPo4ZDxT1eMlFcIrJZPpN9jgJzne4JqyYmY+MTi7YnHt5uYy9jJBPaEqJZgMyaQwbYZtDXsoMQMraXwp4mniJCkyuXzIOEgYEeHWTV2VyytGbn7fz1JEwzmbkX6qMORGB4rqAbncpQSae/TrL5+WRfH5+/fp1MQ6Vnkhp6yxPOJyD/71NjKmFcoEdO17861/pcMn2m1+vp0HYkiWYOsx8WA/hFzorhZUCzupJI50dzyUYWuLAeDsZ6Ghp4C17xGrz/axFgMF8pDzHInmHWjRBNpubEMRDsPLExC3EkkyBZfRbonARksDMNjO+EohXCzFnlhrJaOBfwM3jD59hkEU3RGMCD2yoPlnMj87DtXTeaR5Z2InonXDQHkkWBSbRjb7uv7Pt8D1Vzp/Eu6RNEGVNyNTPnk03bMFSiwBhzam5K6/ADSDS5PmCSWWSBjjaXC5Z5xmTMmUA9FDcdn6v602xhJO7LWdFikqWjyVRqTpRsq35z4mG2xx8y/KFk6Xhk9bmSMYMhTTToRnOfJ3GN6fYCscjmgUmsOdH7uv/1bsi7WbRkrmrxylwwmXc0f0ZDAeDEyhkLsc19QjZvOIIQQAFAs9kcN4tNFuMBmbzRFuRa91v0sddpzgsA1ORyJGNCwHTH3Lu+0HRnM04WI4shWoxGfGRuCGywwVnZ8vcA8wMgHlqsVmgIoF5gix09brt9E30D1qLz7HLJVNolum/EHfZlgEsahSWRxWoEkHmKBNNGyz+endc3xUWL5xNM/4TGta0AmUNG5ZpwNiNY5kRnvKcDb/zEnIoTIFv39+fxQhOWpZDR4OwGUm3ptWRRaHGbCJCVlkIWjha7hUiyg9eSqWroC5QcM4qCZAe8Zp3FyYzpY108GqrXxx/CJg0iyDrLsaZsTK6fvyZEQ8h6QplcT+OhRVrzVbEpy9bt9RQN9bkCX5RH73ofYhk0MjbXX5HPZMO5zdpwbsOdOmYNCcHqjQe7F0u1QD5jyQKZNsbDqk4va//TkIhGyKhkDlm5WfnWs23+w46woahMi/pNi5DF6Z2MyW02a3/L3TA6uWup0P/klZX3gPwxfKaLISO9k2IF+s0a16Obc8nUF9vOZnvvV1ZusCE9tSBYGjT6F7zgab49VZPr0dl3YX4UZM59UnkG7uuSraisi6GiFzFZtjeZ+5CyN2AVjIL4kaMZbQRZdW0J7vvXih8Np39kCEhmP+qG6EMF05hEh9LBkSOab6GjbTMqbaiG/uF7D4JlbZds5YYDQ7Nz27Z7ye3gg25ENCfr9LbuaNs/5+JOuHfoJaFpA8ilfz85a2ZZspUi+158Q1zERhednp18l41Qo8ojelvXqfZYMNJxzktosiFPT5JrzdQ7PxmQDXftkupNZxKybKp5lvz1ooawMeks2G0GElpBOHsgG8akf7aTAgXfs/cXbaJ4Awsb8JgsfwoqrKV+TUMczhtsC9IZSRuX3lRzO9iGquo/1s6bkCt1msdk79lGiv4p878I2TtYpbmTPJnKAoeT2+SmymUgaZDP51ceWSAEgHt9u8dcKWJMjuzlp5Asa+NqO2eXH4zAN3UaAIo76ch9UG+gdcYePt8/qdNf52uEK4X9H5B9YybJcz9Xp2yb73v4qrxXcefsYsKZlPZNePJg0z9LhdfNOlQ0/+qPl/O1FC3EmLDfpG1M71ZXWT/75pGd0qrN5HduUQqVDLkZv84WhcA44ZH5zGn8YsG8AMjaeepaL6ugOMzDzmwBWSp1/uJfJ0S/QIwFAUAcjZnZYPOGqp/7wFKnBO36hTRQ/BuS3Xl/X3nJELLTJlv37DvrajRnkFkNft0G/h7sZbSCyRrzh18yqtr1B9aWoPz07Dm6JWD+ms0r33IxrzvH2SzwXbiIJ7dF0SnrJ02erPnO9bXeMw4BYxWVuy5u8GaCyfiaqTXmqyIbmXhqO/DhCX13pXmDGQmp0/NA8wAN+ZCBONqrBE1HT2o82WKw1M4vKhozAlLQ0ojgt1e8oYN+3qSiGZc7oWS9kWu+0apXkD1vVAT2TlCz6fkw6//ImIKtIEWUN8aeaF4MyOp5wJieo9kTKJqBvQyWrgzR1BHJGaeByuc/iDkZ/1dQZB4IvqRvu9F5SIdxbSya8eEs8Ng0oz2DMY8qqV2PzJDk4sqN4Xg5IyBbs2kQyejyOxN1AKIP6Y09Ptni1wv1F2/MJumdAFlGv7mBa4wJGKykAtZ/CJkALYl7GHXKp9k90dqgInpN6dAPyEg0+eULbw8KBvIG4jd+YjK0Ml/2jClKHDsopQHJvHspaGH9ULgsAg25aUpLaO6nefVDkgPzTOmK5q55kIlmdwhUJTlDqFqz7/LLU+plyP+3xEvfc2gOoc+sPIFrXIzPQWOyaP+62yqmXmi6chheB+CC8aKfuzZnJMMfhEvi5TfF2gYvWleVZJmXjENzl/LSCLiDLzfq6Jo1ZiA6z765dXjJNmohS7jxp8QL70lgEBg/BGk2xdzWngF8nbgZCgEamQIvg4+WNFj3TyTQgsJq2IqlIl5/02WDQO0Lkhnt0mEZyfKI5rO/ZQD6QMnyQTAQnVODdX+8WWA7dNV7A4l2Qr+eae2pIP+zCQ2Y84fBpLPVn7KsTqn/B50MFhCdzDYlDX0+rEYsJ8SeRvv1hGYFhhmoMK52axgUbPVupBozKpkQLNW8mDCLaQbYy8LBVhp4SxizAtOcBXoA1Da15vVUvmPQuob8L/2l+LnOZtSW+Ftw8iBqBWYR7yTq02oF7aPQnkwU2M/TVVY0w/HSrNDJgDE/sttuUMbolCP3VuTI4mhmEWL3XmgQJuE+rvrI9H/oOFtsy3tm9alClkfP2Y9CNmuaDFr7k7h92q3f+dCoZCFO9olZR6/g9UBzt3TmcOboMzttNCfQc6JC+08fGc3/wlrNL+wSZwVvZdueu4WH7IscsGjdENXeCUXrRYN9Yvfd4LiMtWeyfBTIt0C1EF8jDBkG7DHSyZr3PsVwjj2KsxMlh5YIJQ/bPtXuhRFK+oI8a0z8b8Kw3Ln3KYZWKSU78Y5syOENuBeaD+2zKOV6UUDNeUdyvwhs7bMPTEP9ZXI95j6xCt4hRpe8uBE6XhNYhww7qGiPoa8mqebamN3dQha1JGMfOlAkrnbpQzOtLyKL4hjwyOxQ79/5wm24vCROFnv/WrGGd7uO2V16Ba37USSbPwbu7JDc31z76N86i9+WkvthozJRyQ3xftcx+4gJTSjbqY8sg5ws8ARQMP++RgzWGS60GbFBtqH7VIO7tj8HXj5xFOAYyAudrHn+mds1ThRLri+4gbNC0Pr+B9UA2w7H5iZcO8NEJn/Bzmf+WAKN7GJeX3Q/btE7T+OC25avta37ZNN/b9pDZQKZrNlM3lvcbnYFD6/heRsLn9pTrOBhR/K47UdzdUv5hGt60Wlz3t/cSQX0AgmWbEkvLQ7GqnbV5dAKpumMU+cMHHS1RxSZjPc3d85TYydwHIdCdru+RjGsGtmRPijwBy3Ao0Yu74FyGAMk3Dwy5jtixJ3U/SU8vISrqeBdCiAqX6UYQsNbZkAc8BZ1z0HpOuOPzfM1gNdsom4ASAf/srN23vw4drqCM1WUtncmQ+u1YPDwqZZ3fIsjOJ8CHtLSdQazj5++fAGDtTsYmadfvnz6OBs4XeFRL0qC7MBN7rZ+68iqXO0oQjZMZ0I+WH66fwImM+QAGkawo989ESpHTy+6GmhCNnJ8kaaZ8A/vUKMglzbwDsGpzh/DzkVrlLZIc4dOIBLiF6XgnSiQ3Co1lnCGVrFSo2cFnXSV17EpSpceMLNbe73v+0quTGVLHjvm4myK6R33AQUrL+3QsVyl5QUC6K4sbSHhFEWzLmj1o1Zlmaeh5Sq+Y8/6XTMmnKKY3T5Tc3d9qVwrMLXV2COzkhdjJ1GfQ6co9YQzvmCrHdSW4fpcyVVq3OF6F1bbdM8IEkEpBbNt+aiSG9XasgXz2IYH/rPWkof9gdVtJ5Q6XeECfky0u9aAPzauczD8Q1ygFHOV7dIuBwfK1dXxyXgwsCxrMBifHF9dBa7o7Ja2K7k/eoAiYGttBtmiS2eztf3n9KJsuXKtdLQVG2vrqFQr597i2ERg1GKjPCxVxacn+stutTQsN4pveA5mMdco14alzf1ww3b2N0vDWrnxZ71LCAfo0Dmrm3tH+9S6W/tHe5v4vNXcW6rlp8vlGgBvu1YbDluoDIe12jaAauTeXixBAfrR8p/p9Fblf6mWRBgkuM28AAAAAElFTkSuQmCC",
                actions: moreOptions
            },
            {
                ticketId: "2",
                ticketPriority: "Low",
                ticketQuestion: "Question 2",
                ticketDate: "12th Jun 2023",
                SubcardId: 1,
                actions: moreOptions
            }
        ],
        key: ''
    },
];

export default meta;
type Story = StoryObj<typeof RdsCompKanbanBoard>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
    args: {
        allowAddingNewCard: true,
        boardData: sampleItems,
        allowAddingNewSubCard: true,
        avatarData: kanbanAvatarData,

        allCategoriesList: [
            { label: "Category 1", val: "category1" },
            { label: "Category 2", val: "category2" },
            { label: "Category 3", val: "category3" },
            { label: "Category 4", val: "category4" },
            { label: "Category 5", val: "category5" },
            { label: "Category 6", val: "category6" },
        ],
        allTagsList: [
            { label: "Tag 1", val: "tag1" },
            { label: "Tag 2", val: "tag2" },
            { label: "Tag 3", val: "tag3" },
            { label: "Tag 4", val: "tag4" },
            { label: "Tag 5", val: "tag5" },
            { label: "Tag 6", val: "tag6" },
        ],

    }
} satisfies Story;
