// Profile.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { supabase } from "../../utils/supabase";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [firstName, setFirstName] = useState("1");
  const [lastName, setLastName] = useState("1");
  const [bio, setBio] = useState("1");
  const [location, setLocation] = useState("1");
  const [birthdate, setBirthdate] = useState("2002-09-17 22:43:46+00");
  const [profilePicture, setProfilePicture] = useState("1");
  const [coverPhoto, setCoverPhoto] = useState("1");
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*");
      if (error) throw error;
      if (!data) throw new Error("No data returned from fetchProfiles");

      setProfiles(data);
    } catch (error) {
      Alert.alert("Error fetching profiles", error.message);
      console.error("Error fetching profiles:", error);
    }
  };

  const addProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            bio: bio,
            location: location,
            birthdate: birthdate,
            profile_picture: profilePicture,
            cover_photo: coverPhoto,
          },
        ])
        .select("*");
      if (error) throw error;
      if (!data) throw new Error("No data returned from addProfile");

      setProfiles([...profiles, ...data]);
    } catch (error) {
      Alert.alert("Error adding profile", error.message);
      console.error("Error adding profile:", error);
    }
  };

  const updateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .update({
          first_name: firstName,
          last_name: lastName,
          bio: bio,
          location: location,
          birthdate: birthdate,
          profile_picture: profilePicture,
          cover_photo: coverPhoto,
        })
        .eq("id", selectedProfile.id)
        .select("*");
      if (error) throw error;
      if (!data) throw new Error("No data returned from updateProfile");

      setProfiles(
        profiles.map((profile) =>
          profile.id === selectedProfile.id ? data[0] : profile
        )
      );
      setSelectedProfile(null);
    } catch (error) {
      Alert.alert("Error updating profile", error.message);
      console.error("Error updating profile:", error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      const { error } = await supabase.from("profile").delete().eq("id", id);
      if (error) throw error;

      setProfiles(profiles.filter((profile) => profile.id !== id));
    } catch (error) {
      Alert.alert("Error deleting profile", error.message);
      console.error("Error deleting profile:", error);
    }
  };

  const selectProfile = (profile) => {
    setSelectedProfile(profile);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setBio(profile.bio);
    setLocation(profile.location);
    setBirthdate(profile.birthdate);
    setProfilePicture(profile.profile_picture);
    setCoverPhoto(profile.cover_photo);
  };

  return (
    <View>
      <Text>Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.first_name} {item.last_name}
            </Text>
            <Button title="Edit" onPress={() => selectProfile(item)} />
            <Button title="Delete" onPress={() => deleteProfile(item.id)} />
          </View>
        )}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="Birthdate"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        placeholder="Profile Picture"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      <TextInput
        placeholder="Cover Photo"
        value={coverPhoto}
        onChangeText={setCoverPhoto}
      />
      <Button
        title={selectedProfile ? "Update Profile" : "Add Profile"}
        onPress={selectedProfile ? updateProfile : addProfile}
      />
    </View>
  );
};

export default Profile;
