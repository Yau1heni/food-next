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
import { EditableField } from '@components/EditableField/EditableField';

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
          src={profile.avatarUrl}
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
        initialValue={profile.name}
        onSave={profile.setName}
        placeholder={'enter name'}
      />
      <EditableField
        initialValue={profile.email}
        onSave={profile.setEmail}
        inputType={'email'}
        placeholder={'enter email'}
      />
      <Input
        value={profile.password}
        onChange={profile.setPassword}
        placeholder="Password"
        type="password"
      />
      <Button className={styles.saveButton} disabled={!profile.canSave} onClick={profile.save}>
        Save
      </Button>
    </div>
  );
});
