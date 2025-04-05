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
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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

      const currentUser = await Parse.User.currentAsync();

      let notebookQuery = new Parse.Query('Notebook');
      notebookQuery.equalTo('user', currentUser);
      const notebookResults = await notebookQuery.find();

      if (notebookResults.length > 0) {
        let notebookResult = notebookResults[0];
        let newNotesList = notebookResult.get('notes');

        newNotesList.push(newNote);
        notebookResult.set('notes', newNotesList);
        await notebookResult.save();

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
            { color: colors.lightText, fontSize: 30 * scaleFactor },
          ]}>
          Noter
        </Text>
        <Text style={{ color: colors.darkText, fontSize: 16, textAlign: 'center' }}>
          Her kan du skrive noter, føre dagbog eller nedskrive dine brain dumps.
        </Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}
          onPress={() => setNotesModalVisible(true)}>
          <FontAwesomeIcon
            icon={faPlus}
            size={40 * scaleFactor}
            color={colors.lightText}
          />
        </TouchableOpacity>
        {notes && notes.length > 0 ? (
          notes.map((item, index) => (
            <AccordionItem
              key={item.id || index}
              title={item.get('name')}
              icon={null}
              titleStyle={{ color: colors.darkText }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  fontSize: 16,
                  padding: '2%',
                  elevation: 5
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
                style={[styles.btn, {
                  backgroundColor: colors.middle, borderColor: colors.middleShadow, width: '30%'
                }]}
                onPress={() => updateNote(item, updatedNoteContent[item.id])}>
                <Text style={{ fontSize: 18, color: colors.lightText }}>Gem</Text>
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
                  color: colors.dark
                }}>
                Tilføj en ny note
              </Text>
              <TouchableOpacity onPress={() => setNotesModalVisible(false)}>
                <FontAwesomeIcon icon={faCircleXmark} size={25} />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18, color: colors.dark }}>Hvad skal din note hedde?</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 10,
                fontSize: 20,
                padding: '2%',
                marginVertical: '5%',
                elevation: 5,
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
                elevation: 5
              }}
              onChangeText={text => setNoteContent(text)}
              value={noteContent}
              multiline={true}
              numberOfLines={12}
              textAlignVertical={'top'}></TextInput>
            <TouchableOpacity
              style={[styles.btn, {
                backgroundColor: colors.dark, borderColor: colors.darkShadow, alignSelf: 'center', width: '50%'
              }]}
              onPress={() => saveNewNote()}>
              <Text style={{ fontSize: 18, color: colors.lightText }}>Gem note</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
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
    justifyContent: 'center',
    padding: '2%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginBottom: 8,
    borderBottomWidth: 4,
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
    marginVertical: '5%'
  },
  icon: {
    alignSelf: 'center'
  }
});
export default Notebook;