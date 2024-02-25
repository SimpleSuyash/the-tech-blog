const {Post} = require("../models");

const postData = [
    {
        title: "Are Deepfakes Overblown?",
        content: `<p>I've worked in and out of security for decades. We did the same kinds of things people do with deepfakes with far older technology when I was working on the switchboard at my friend's motel when I was a kid. Back then, all we had were hard-wired phones, but we'd often mess with people late at night by pretending to be people we weren't.</p>

        <p>Later, collaborating with headhunters, a common way to find people in companies was to call in and use an executive's name who was out of town to convince someone illicitly that our external unauthorized request was legitimate. Genuinely good headhunters were extremely good at this. Deepfakes improve the ability to deceive people, but if you are paying attention, there is no reason to be fooled by them.</p>
        
        <p>Let's talk about deepfakes this week, and we'll close with a news service social media product called Otherweb that does a better job than most at weeding out the fake news that has been a massive source of mistakes, fraud, and embarrassment.</p>
        
        <h3>The $25M Deepfake Fraud</h3>
        <p>What got me thinking about this was a quarterly briefing from HP Wolf Security on security threat trends from the prior quarter and its answer to my question on creative new threats.</p>
        
        <p>HP shared a successful fraud scheme where an employee received calls from two deepfake executives they knew and were convinced to wire $25 million from a financial institution in Hong Kong to an illicit organization. It took two weeks before the fraud was discovered.</p>
        
        <p>I'm an ex-IBM internal auditor, and all kinds of red flags immediately popped up in my head when I read the story. First, financial institutions typically have massive controls over their monetary systems because no one wants to invest money in a financial institution that isn't safe.</p>
        
        <p>There are a lot of industry rules and practices that have been developed over centuries to protect these institutions. One is called “separation of duties,” where no one person can authorize a significant payment without a physical executive sign-off. When you're talking about millions of dollars, the expenditure might require the CFO, the CEO, and an independent board member to sign off on it.</p>`,
        post_date: "2024-02-05",
        creater_id: 1
    },
    {
        title: "Apple’s Vision Pro: The Slow Birth of Spatial Computing",
        content: `<p>The Apple Vision Pro has started to ship, and reviewers are providing a range of opinions on this first-generation product. Like most first-gen hardware, the offering is strong on technology but still weak on applications, but both will change as it evolves and more developers start building for it.</p>

        <p>As of this writing, Apple has pre-orders for around 200,000, which should be enough to get developers interested in the platform. Now we'll see if Apple's weakened marketing, which is still stronger than most of its peers, is up to the task of building demand for this device outside Apple loyalists.</p>
        
        <p>For most of you, this device isn't ready yet. It's too expensive, has little app support, and using the rule of three, the current version has two more iterations to go before it hits the price and functionality that most will find compelling.
        The success of Vision Pro hinges on the effectiveness of Apple's marketing strategy. Not only do these efforts need to attract more customers to Vision Pro, but they must also engage with current buyers to secure and highlight positive outcomes. Failing to achieve this could result in negative social media feedback, which will kill demand.</p>

        <p>So, this will be a test of Apple's marketing arm to see if Apple still builds a decent demand-generation campaign around the product. Apple traditionally funds marketing better than most, and if it adequately funds marketing the Vision Pro, it could eclipse even the iPhone as a disruptive offering as it evolves version over version. </p> `,
        post_date: "2024-02-15",
        creater_id: 4
    },
    {
        title: "Review: Nvidia RTX 4070 Super",
        content: `<p>Much of AI development work is still done on GPUs. Last week, Nvidia announced one of its strongest GPU values, the RTX 4070 Super.</p>

        <p>With significant performance increases over Nvidia's prior efforts, this $599 list-price GPU should futureproof your desktop PC at a reasonable price. Yes, they also announced the RTX 4070 Ti Super and RTX 4080 Super, but these cards are likely overkill for most of you who just want some futureproofing and don't necessarily need to be on the forefront.</p>
        
        <p>This RTX 4070 has a significant performance boost over the old RTX 2070 and 3070 cards, making it a cost-effective upgrade if you are running one of those older cards — particularly the 2070, which is aging out.</p>
        
        <p>To give an idea of the performance boost, it doubles the frame rates of the RTX 3090 card and can more than triple the frame rates of the old RTX 2070 card, depending on the game. This card anticipates the coming wave of AI games and tools, as well, and should provide a decent performance boost for those who want their desktop system on the performance curve for 2024.</p>
        
        <p>The Nvidia RTX 4070 Super is a decent card at an affordable price. It's available on Jan. 17, and it's my Product of the Week.</p>`,
        post_date: "2024-02-17",
        creater_id: 3
    }
];
const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;