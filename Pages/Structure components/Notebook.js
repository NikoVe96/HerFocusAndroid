import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import AccordionItem from "../../Components/AccordionItem";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import Parse from 'parse/react-native';
import { TextInput } from "react-native-gesture-handler";
import BottomNavigation from "../../Navigation/BottomNav";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const Notebook = () => {

  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isNotesModalVisible, setNotesModalVisible] = useState(false);
  const [noteName, setNoteName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [updatedNoteContent, setUpdatedNoteContent] = useState({});
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  useEffect(() => {
    notesQuery();
  }, []);

  function handleMenuClick(page) {
    setPage(page);
  }

  function toggleMenu() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  async function notesQuery() {
    const currentUser = await Parse.User.currentAsync();

    let notesQuery = new Parse.Query('Notebook');
    notesQuery.equalTo('user', currentUser);
    notesQuery.include('notes');
    const notesResult = await notesQuery.find();

    if (notesResult.length > 0 && notesResult[0].get('notes')) {
      console.log('notes: ' + notesResult[0].get('notes'));
      setNotes(notesResult[0].get('notes'));
    } else {
      setNotes([]);
    }
  }

  async function saveNewNote() {
    try {
      const newNote = new Parse.Object('Note');
      newNote.set('name', noteName);
      newNote.set('content', noteContent);
      await newNote.save();
      console.log('New note saved:', newNote);

      const currentUser = await Parse.User.currentAsync();
      console.log('Current user:', currentUser);

      let notebookQuery = new Parse.Query('Notebook');
      notebookQuery.equalTo('user', currentUser);
      const notebookResults = await notebookQuery.find();
      console.log('Notebook results:', notebookResults);

      if (notebookResults.length > 0) {
        let notebookResult = notebookResults[0];
        let newNotesList = notebookResult.get('notes');
        console.log('Current notes list:', newNotesList);

        newNotesList.push(newNote);
        console.log('Updated notes list:', newNotesList);
        notebookResult.set('notes', newNotesList);
        await notebookResult.save();
        console.log('Notebook updated:', notebookResult);

        await notesQuery();

        console.log('Success: note saved');
        Alert.alert('Din note er blevet gemt!');
        setNoteContent('');
        setNoteName('');
        setNotesModalVisible(false);
      } else {
        Alert.alert('Notesbog ikke fundet');
      }
    } catch (error) {
      console.log('Error saving new note:', error);
    }
  }

  async function updateNote(note, content) {
    note.set('content', content);
    try {
      await note.save();
      Alert.alert('Din note er blevet gemt!');
      notesQuery();
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert('Fejl. Noten kunne ikke gemmes');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.darkText, fontSize: 30 * scaleFactor },
          ]}>
          Noter
        </Text>

        <View
          style={[styles.seperator, { backgroundColor: colors.dark }]}></View>
        {notes && notes.length > 0 ? (
          notes.map((item, index) => (
            <AccordionItem
              key={item.id || index}
              title={item.get('name')}
              icon={null}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  fontSize: 16,
                  padding: '2%',
                }}
                value={updatedNoteContent[item.id] || item.get('content')}
                onChangeText={text =>
                  setUpdatedNoteContent({
                    ...updatedNoteContent,
                    [item.id]: text,
                  })
                }
                multiline={true}
                numberOfLines={12}
                textAlignVertical={'top'}></TextInput>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  backgroundColor: colors.middle,
                  borderColor: colors.middle,
                  borderRadius: 10,
                  padding: 10,
                  elevation: 10,
                  marginVertical: '5%',
                  alignItems: 'center',
                  width: '40%',
                  alignSelf: 'flex-end',
                }}
                onPress={() => updateNote(item, updatedNoteContent[item.id])}>
                <Text style={{ fontSize: 16 }}>Gem</Text>
              </TouchableOpacity>
            </AccordionItem>
          ))
        ) : (
          <Text></Text>
        )}
        <Modal
          isVisible={isNotesModalVisible}
          onBackdropPress={() => setNotesModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.light,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.light,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  marginLeft: '20%',
                  marginBottom: '10%',
                }}>
                {' '}
                Tilføj en ny note
              </Text>
              <TouchableOpacity onPress={() => setNotesModalVisible(false)}>
                <FontAwesomeIcon icon={faCircleXmark} size={25} />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18 }}>Hvad skal din note hedde?</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 10,
                fontSize: 20,
                padding: '2%',
                marginVertical: '5%',
              }}
              onChangeText={text => setNoteName(text)}
              value={noteName}></TextInput>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 10,
                fontSize: 16,
                padding: '2%',
              }}
              onChangeText={text => setNoteContent(text)}
              value={noteContent}
              multiline={true}
              numberOfLines={12}
              textAlignVertical={'top'}></TextInput>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                backgroundColor: colors.middle,
                borderColor: colors.middle,
                borderRadius: 10,
                padding: 10,
                elevation: 10,
                marginVertical: '10%',
                alignItems: 'center',
                width: '50%',
                alignSelf: 'center',
              }}
              onPress={() => saveNewNote()}>
              <Text style={{ fontSize: 18 }}>Gem note</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setNotesModalVisible(true)}>
        <FontAwesomeIcon
          icon={faPlusCircle}
          size={50 * scaleFactor}
          color={colors.dark}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowView: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: 5,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  seperator: {
    width: 250,
    height: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 35,
  },
  seperator: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 15,
  },
  icon: {
    alignSelf: 'center'
  }
});
export default Notebook;