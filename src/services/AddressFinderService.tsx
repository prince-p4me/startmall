const addressFinderAPI =
  'https://api.addressfinder.io/api/au/address/autocomplete?key=M8BRGTA3QE6WLD9NFHKX&secret=M8BRGTA3QE6WLD9NFHKX&q=1%20Martin%20Street&format=json&gnaf=1';

const fetchAddressFinder = (addr: string) => {
  console.log(addr + ' typed by user');
  fetch(addressFinderAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export default fetchAddressFinder;
