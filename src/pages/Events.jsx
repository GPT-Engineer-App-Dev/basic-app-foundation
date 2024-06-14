import { useEvents } from '../integrations/supabase/index.js';
import { Container, Heading, VStack, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const Events = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">Events</Heading>
        {events.map(event => (
          <VStack key={event.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" align="stretch">
            <Heading as="h2" size="md">{event.name}</Heading>
            <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
            <Text>Venue ID: {event.venue_id}</Text>
            <Text>Starred: {event.is_starred ? 'Yes' : 'No'}</Text>
            <Text>Private: {event.private ? 'Yes' : 'No'}</Text>
            <Text>Cancelled: {event.cancelled ? 'Yes' : 'No'}</Text>
          </VStack>
        ))}
      </VStack>
    </Container>
  );
};

export default Events;