'use client';

import styles from './Profile.module.scss';
import { Avatar } from '@components/Avatar';
import { InputFile } from '@components/InputFile';
import Button from '@components/Button';
import Input from '@components/Input';
import { useRootStore } from '@/store/RootStore/hooks';
import { useClient } from '@hooks/useClient';
import Loader from '@components/Loader';
import { observer } from 'mobx-react-lite';
import { EditableField } from '@components/EditableField';

export const Profile = observer(() => {
  const { profile } = useRootStore();

  const { isClient } = useClient();
  if (!isClient) return null;

  if (!profile.isHydrated) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.avatarRow}>
        <Avatar
          src={profile.profileDraftData.avatarUrl}
          size={96}
          className={styles.avatar}
          imageClassName={styles.avatarImage}
        />
        <div className={styles.actions}>
          <InputFile onFileSelected={(f) => profile.upload(f)}>
            {(open) => <Button onClick={open}>Upload avatar</Button>}
          </InputFile>
        </div>
      </div>
      <EditableField
        initialValue={profile.profileDraftData.name}
        onSave={profile.setField}
        placeholder={'enter name'}
        removeEdit={profile.removeEdit}
        setEditMode={profile.setEditMode}
        isEdit={profile.isEdit('name')}
        name={'name'}
      />
      <EditableField
        initialValue={profile.profileDraftData.email}
        onSave={profile.setField}
        inputType={'email'}
        placeholder={'enter email'}
        removeEdit={profile.removeEdit}
        setEditMode={profile.setEditMode}
        isEdit={profile.isEdit('email')}
        name={'email'}
      />
      <Input
        value={profile.profileDraftData.password}
        onChange={(value) => profile.setField('password', value)}
        placeholder="Password"
        type="password"
      />
      <Button className={styles.saveButton} disabled={!profile.canSave} onClick={profile.save}>
        Save
      </Button>
    </div>
  );
});
