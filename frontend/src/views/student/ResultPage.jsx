import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box, List, ListItem, ListItemText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection, addDoc, getDocs, doc
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

const ResultPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo?._id;

  useEffect(() => {
    if (userId) {
      console.log("Fetching notes for user ID:", userId);
      fetchNotes();
    }
  }, [userId]);

  const fetchNotes = async () => {
    try {
      const filesRef = collection(db, `notes/${userId}/files`);
      const snapshot = await getDocs(filesRef);
      const notesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched notes:", notesList);
      setNotes(notesList);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;
    setLoading(true);
    console.log("Uploading for user ID:", userId);

    try {
      const storageRef = ref(storage, `notes/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, `notes/${userId}/files`), {
        fileName: file.name,
        fileUrl: downloadURL,
        uploadedAt: new Date().toISOString(),
        fileType: file.type
      });

      setFile(null);
      fetchNotes();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Result Page" description="this is Result page">
      <DashboardCard title="Notes Upload">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            accept=".pdf,.txt,.doc,.docx"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>

          {file && (
            <Typography variant="body2">
              Selected file: {file.name}
            </Typography>
          )}

          <LoadingButton
            loading={loading}
            disabled={!file}
            variant="contained"
            onClick={handleUpload}
          >
            Upload
          </LoadingButton>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Your Notes
          </Typography>

          {notes.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No notes uploaded yet.
            </Typography>
          ) : (
            <List>
              {notes.map((note) => (
                <ListItem key={note.id}>
                  <ListItemText
                    primary={note.fileName}
                    secondary={new Date(note.uploadedAt).toLocaleString()}
                  />
                  <Button
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ResultPage;
