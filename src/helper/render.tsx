import AWSVerifyEmail from '@/shared/config/email/signup';
import React from 'react';
import { render } from '@react-email/components';

export default render(<AWSVerifyEmail verificationCode="123456" />);
