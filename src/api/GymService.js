import axios from 'axios';

class GymService {

  getGyms = async () => {

    try {

      // 1. Execute the request
      const response = await axios.get('./Gyms.json');

      // 2. Destructure the data object
      const { data } = response;

      const sortedGyms = data.sort();

      const groupedGyms = sortedGyms.reduce((gyms, gymName) => {
        // get first letter of name of current element
        let letter = gymName[0];
        // if there is no property in accumulator with this letter create it
        if (!gyms[letter]) {
          gyms[letter] = { letter, gymNames: [gymName] }
        } else {
          // if there is push current element to children array for that letter
          gyms[letter].gymNames.push(gymName);
        }
        // return accumulator
        return gyms;
      }, {});

      var gymsArray = Object.keys(groupedGyms).map((key) => {
        return groupedGyms[key];
      })
      // 3. Return the data to the client
      return gymsArray;

    } catch (err) {

      const { status } = err.response;

      const errorObject = {
        networkStatus: 0,
        networkMessage: ''
      };

      // 4. Check status code and return the appropriate response
      switch (status) {
        case 401:
          errorObject.networkStatus = err.response.status;
          errorObject.networkMessage = 'Access Denied: You are trying to access an authorized endpoint.';
          break;

        case 500:
          errorObject.networkStatus = err.response.status;
          errorObject.networkMessage = "Look's like there is an internet server errror. Pleae try again later.";
          break;

        default:
          errorObject.networkStatus = err.response.status;
          errorObject.networkMessage = '404 Unexpected error';
      }
    }
  };
}

export default new GymService();