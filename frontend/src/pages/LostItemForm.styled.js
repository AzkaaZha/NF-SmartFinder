// LostItemForm.Styled.js
import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #d9534f;
  font-weight: 500;
`;
