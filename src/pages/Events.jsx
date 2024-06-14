import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { Container, Heading, VStack, Text, Spinner, Alert, AlertIcon, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

const Events = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue_id: 0, is_starred: false, private: false, cancelled: false });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent, {
      onSuccess: () => setNewEvent({ name: '', date: '', venue_id: 0, is_starred: false, private: false, cancelled: false }),
    });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent, {
      onSuccess: () => setEditingEvent(null),
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

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
            <Button colorScheme="blue" onClick={() => setEditingEvent(event)}>Edit</Button>
            <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
          </VStack>
        ))}
        <Heading as="h2" size="lg" textAlign="center">Add New Event</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <FormLabel>Date</FormLabel>
          <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <FormLabel>Venue ID</FormLabel>
          <Input type="number" value={newEvent.venue_id} onChange={(e) => setNewEvent({ ...newEvent, venue_id: parseInt(e.target.value) })} />
          <FormLabel>Starred</FormLabel>
          <Input type="checkbox" checked={newEvent.is_starred} onChange={(e) => setNewEvent({ ...newEvent, is_starred: e.target.checked })} />
          <FormLabel>Private</FormLabel>
          <Input type="checkbox" checked={newEvent.private} onChange={(e) => setNewEvent({ ...newEvent, private: e.target.checked })} />
          <FormLabel>Cancelled</FormLabel>
          <Input type="checkbox" checked={newEvent.cancelled} onChange={(e) => setNewEvent({ ...newEvent, cancelled: e.target.checked })} />
          <Button colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
        </FormControl>
        {editingEvent && (
          <VStack>
            <Heading as="h2" size="lg" textAlign="center">Edit Event</Heading>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
              <FormLabel>Date</FormLabel>
              <Input type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
              <FormLabel>Venue ID</FormLabel>
              <Input type="number" value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: parseInt(e.target.value) })} />
              <FormLabel>Starred</FormLabel>
              <Input type="checkbox" checked={editingEvent.is_starred} onChange={(e) => setEditingEvent({ ...editingEvent, is_starred: e.target.checked })} />
              <FormLabel>Private</FormLabel>
              <Input type="checkbox" checked={editingEvent.private} onChange={(e) => setEditingEvent({ ...editingEvent, private: e.target.checked })} />
              <FormLabel>Cancelled</FormLabel>
              <Input type="checkbox" checked={editingEvent.cancelled} onChange={(e) => setEditingEvent({ ...editingEvent, cancelled: e.target.checked })} />
              <Button colorScheme="teal" onClick={handleUpdateEvent}>Update Event</Button>
            </FormControl>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Events;