import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

// Import our starter tweet data from a JSON file.
// This keeps the data out of App.tsx so the file is cleaner.
import tweetsData from "./data/tweets.json";
import type { Tweet } from "./types/Tweet";

// // This describes what a Tweet object should look like.
// type Tweet = {
//   id?: number;
//   name?: string;
//   username?: string;
//   createdAt?: string;
//   text: string;
//   likes?: number;
//   replies?: number;
//   tag?: string;
// };

// App is our main React component.
// A component is a function that returns UI.
function App() {
  // tweets is the current list of tweets on the page.
  // setTweets is how React updates the list.
  // We start with tweets from the JSON file.
  const [tweets, setTweets] = useState<Tweet[]>(tweetsData as Tweet[]);

  // input is what is currently typed in the box.
  // setInput is how React updates it.
  const [input, setInput] = useState("");

  // This function runs when the user clicks the Yap button.
  const handleYap = () => {
    // If the input is empty or only spaces, stop the function.
    if (!input.trim()) return;
    const newTweet: Tweet = {
      id: Date.now(),
      name: "Student",
      username: "@you",
      createdAt: new Date().toISOString(),
      text: input.trim(),
      likes: 0,
      replies: 0,
      tag: "",
    };

    // Update the tweet list.
    // Put the new tweet first, then copy in all the old tweets.
    setTweets([newTweet, ...tweets]);

    // Clear the input box after posting.
    setInput("");
  };

  // Save the current time once during this render.
  const currentTime = new Date().toISOString();

  // Helper function that turns a date into "now", "2m", "3h", or "2d".
  const timeAgo = (iso?: string) => {
    if (!iso) return "now";
    const diff = new Date(currentTime).getTime() - new Date(iso).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return "now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const day = Math.floor(hr / 24);
    return `${day}d`;
  };

  return (
    <Box bg="blue.900" minH="100vh" py={8}>
      <Container maxW="650px">
        <VStack gap={5} align="stretch">
          <Box bg="gray.800" p={6} borderRadius="2xl" boxShadow="md">
            <Heading size="lg" color="white">
              🤠 Yapper 📣
            </Heading>
            <Text color="gray.400" mt={2}>
              A simple Twitter-style homepage built with React and Chakra UI.
            </Text>
          </Box>
          <Box bg="gray.800" p={5} borderRadius="2xl" boxShadow="md">
            <VStack gap={3} align="stretch">
              <Text fontWeight="bold" color="white">
                Create a post
              </Text>
              <Input
                // Placeholder text appears before the user types.
                placeholder="What's happening?"
                // Chakra styling props.
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                // The input box shows whatever is stored in input.
                value={input}
                // Every time the user types, update input.
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                alignSelf="flex-end"
                bg="blue.500"
                color="white"
                // When clicked, run handleYap.
                onClick={handleYap}
              >
                Yap
              </Button>
            </VStack>
          </Box>
          {tweets.map((tweet) => (
            <Box
              // React needs a key when rendering a list.
              key={tweet.id ?? tweet.username}
              bg="gray.800"
              p={5}
              borderRadius="2xl"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.700"
            >
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="start">
                  <Box>
                    <HStack>
                      <Text fontWeight="bold" color="white">
                        {/* Show the tweet name. If missing, show Student. */}
                        {tweet.name ?? "Student"}
                      </Text>
                      <Badge colorScheme="blue">{tweet.tag}</Badge>
                    </HStack>

                    <Text color="gray.400" fontSize="sm">
                      {/* Show username and calculated time */}
                      {tweet.username ?? "@you"} · {timeAgo(tweet.createdAt)}
                    </Text>
                  </Box>
                </HStack>

                {/* Tweet message */}
                <Text color="white">{tweet.text}</Text>

                {/* Bottom row: replies, likes, and share */}
                <HStack gap={6} color="gray.400" fontSize="sm">
                  {/* If replies is missing, show 0. */}
                  <Text>💬 {tweet.replies ?? 0}</Text>

                  {/* If likes is missing, show 0. */}
                  <Text>❤️ {tweet.likes ?? 0}</Text>

                  <Text>🔁 Share</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

// Export App so main.tsx can use it.
export default App;