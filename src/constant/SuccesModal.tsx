// components/AddSuccessModal.tsx
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import { colors } from './colors';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  amount?: number;
  amountLabel?: string;
  title: string;
  message: string;
  onNavigateHome?: () => void; // ✅ optional callback
}

const SuccessModal = ({
  isVisible,
  onClose,
  amount,
  amountLabel,
  title,
  message,
  onNavigateHome,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/Images/SuccessImg.png')}
          style={styles.icon}
        />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{message}</Text>

        {amount !== undefined && (
          <>
            <Text style={styles.amountLabel}>{amountLabel}</Text>
            <Text style={styles.amount}>${amount}</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onClose();
            setTimeout(() => {
              onNavigateHome?.();
            }, 300);
          }}>
          <Text style={styles.buttonText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: '20@ms',
    borderTopRightRadius: '20@ms',
    padding: '20@ms',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: '16@ms',
    top: '16@vs',
    zIndex: 1,
  },
  closeText: {
    fontSize: '24@ms',
    color: '#555',
  },
  icon: {
    width: '60@ms',
    height: '60@ms',
    marginTop: '12@vs',
    marginBottom: '20@vs',
    resizeMode: 'contain',
  },
  title: {
    fontSize: '18@ms',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4@vs',
  },
  subtitle: {
    fontSize: '12@ms',
    color: '#888',
    marginBottom: '16@vs',
  },
  amountLabel: {
    fontSize: '12@ms',
    color: '#555',
  },
  amount: {
    fontSize: '22@ms',
    fontWeight: '600',
    color: '#000',
    marginBottom: '20@vs',
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: '12@vs',
    borderRadius: '10@ms',
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: '14@ms',
    fontWeight: '600',
  },
});

export default SuccessModal;
