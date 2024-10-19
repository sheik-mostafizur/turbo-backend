import { hashPassword } from '../../utils';
import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    const UUIDs = [
      'c08c6989-205b-4e52-bc61-1d9ed8168922',
      '07909b67-92b4-4329-9586-d282941dfc2d',
      '0deb7d14-7003-40b5-8de2-d1e9b236932a',
      'e6262d73-c43c-4347-88ca-a27bc8c7c7fe',
      'a3da0e83-8da9-4e68-a38c-6696cbc5c78d',
      'ae12eae7-17fd-4f52-b624-6c0bce6f76fa',
      'f2deb27d-eac7-4e4e-b620-b4ef887bbd2a',
      '8532d747-ecf5-4996-bf5e-05aabb096e5b',
      '6ec24758-bf69-4f4f-8642-58f9f9125a2d',
      'f0d3c33d-5077-4042-976f-4ccc40f46a2a',
      '9a4ef075-b049-4ce6-b5a5-4dca277c2d70',
      '8e9f1d5f-5739-4c09-9999-aa283d1b155e',
      '1746d104-30c6-4908-a586-b2b9b042565f',
      '436a2e7c-41f3-4723-86f5-b129cf0fe1fe',
      '68385270-4664-46c7-9af0-e0b132461af2',
      '1118b384-4c4b-4186-8b71-6b8f1436b752',
      '281ef544-6ff6-4955-9417-e9dbde7cbdef',
      'e0b5da0b-4c70-4352-abe2-819a01268a29',
      'def8f8c0-67f5-4ba3-898c-7844d83c67c8',
      '4f2c1f0f-1bd5-4cdb-b3e2-86d98839e09f',
      '45f21a80-10bc-4138-aec9-8bb24fde05b5',
      '9306003d-2ec1-4de9-90f2-08d8e5f957d1',
      '55e5f804-9c70-4323-8f07-e6ca99d4d0ec',
      '550dfefe-337e-49f2-88fb-4c8d656eab40',
      '44e052e9-fe98-4984-8271-2a3c69d31eb9',
      '2d951ea7-6bd4-480b-a642-532c28212410',
      'e46fbfe7-f621-4138-9940-33f21bda7ee5',
      '877d576c-7278-43d9-b87d-640345f3da54',
      '4acc854c-ed42-4722-bbb6-6b905828860e',
      'd9b735d6-3a41-4079-bdb3-492a9fb27408',
      '9ff8e3ab-0a8c-42af-80f8-12b338473c8f',
      '8fd2b4cf-4143-4e83-aec2-b6d67419922a',
      'eb6a44da-fec2-4e2e-90dc-c3c92a6a03fd',
      'aad50702-1a22-4cca-bb5f-206df70055b3',
      '500acbd4-baab-4e7b-b5d5-0817061eeaa9',
      '793632d7-b53d-4e9b-87cd-b6d8d73fcc7d',
      '74a6e3e3-0a31-4231-90b1-b0807d0090b6',
      'eeb0afe4-d4cc-4c8f-9446-7d9081466510',
      '4d02e219-52a9-4b6e-b978-716b347a5dfb',
      '3872488b-df41-4e6c-b31a-601571f7611d',
      'ceb45d15-c9d7-40e9-8307-34dae7806402',
      '23a51268-0804-4608-90b1-2d8323608010',
      '67960e37-23ce-4d59-a463-e7b8eb2eb649',
      '2007aa14-a8fb-419d-9d5f-0db981093040',
      '92f5c5c9-5820-4f65-807c-19b22f3d7a52',
      '6e23956b-8c23-41ce-b9fa-b2f37a8b8c79',
      '5ef5f4cc-f205-4e59-a9f7-94856e131193',
      '799d39e6-39fc-4675-9b30-7a54c61c8753',
      '3acf8b09-9204-49a3-810f-f210ac94bc90',
      '869ca4d3-eb2d-4ea4-b078-cfeb48539a9b',
    ];

    const generateUsers = async () => {
      const password = await hashPassword('password2024');
      const users = [];

      for (let i = 0; i < UUIDs.length; i++) {
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();
        const email = faker.internet.email({
          firstName: firstName,
          lastName: lastName,
        });
        users.push({
          id: UUIDs[i],
          name: `${firstName} ${lastName}`,
          email,
          password,
          created_at: faker.date.between({
            from: new Date('2000-01-01'),
            to: new Date(),
          }),
          updated_at: faker.date.recent(),
        });
      }
      return users;
    };

    // Total user is 50+
    const users = await generateUsers();
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {}, {});
  },
};
