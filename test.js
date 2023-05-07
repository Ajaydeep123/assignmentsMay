function convertToDayDictionary(D) {
  // Create a new dictionary to store the results
  const newD = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  // Define an array of days of the week
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Sort the keys of the input dictionary
  const keys = Object.keys(D).sort();

  // Iterate through the sorted keys
  for (let i = 0; i < keys.length; i++) {
    // Extract the current date and value
    const currentDate = new Date(keys[i]);
    const currentValue = D[keys[i]];

    // Get the day of the current date
    const currentDay = currentDate.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    // Add the value to the corresponding day in the new dictionary
    newD[currentDay] += currentValue;

    // Check if there are missing days between current and next date
    if (i < keys.length - 1) {
      const nextDate = new Date(keys[i + 1]);
      const diffInDays = Math.ceil(
        (nextDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate mean value for missing days
      if (diffInDays > 1) {
        const nextValue = D[keys[i + 1]];
        const meanValue = (currentValue + nextValue) / (diffInDays + 1);

        // Fill in missing days with mean value
        const missingDays = daysOfWeek.slice(
          daysOfWeek.indexOf(currentDay) + 1,
          daysOfWeek.indexOf(
            nextDate.toLocaleDateString('en-US', { weekday: 'short' })
          )
        );
        missingDays.forEach(day => {
          newD[day] = meanValue;
        });
      }
    }
  }

  return newD;
}

// Function to check if two dictionaries are equal
function dictionariesAreEqual(dict1, dict2) {
  const dict1Keys = Object.keys(dict1);
  const dict2Keys = Object.keys(dict2);

  if (dict1Keys.length !== dict2Keys.length) {
    return false;
  }

  for (const key of dict1Keys) {
    if (dict1[key] !== dict2[key]) {
      return false;
    }
  }

  return true;
}

// Unit tests
function runUnitTests() {
  // Test 1: Basic input with missing days
  const D1 = {
    '2023-05-01': 5,
    '2023-05-03': 3,
    '2023-05-04': 7,
    '2023-05-06': 9,
    '2023-05-07': 4
  };

  const expected1 = {
    Mon: 5,
    Tue: 4,
    Wed: 4,
    Thu: 7,
    Fri: 7,
    Sat: 9,
    Sun: 4
  };

  const result1 = convertToDayDictionary(D1);
  console.log('Test 1:', dictionariesAreEqual(result1, expected1));

  // Test 2: Input with no missing days
  const D2 = {
    '2023-05-01': 5,
    '2023-05-02': 10,
    '2023-05-03': 3,
    '2023-05-04': 7,
    '2023-05-05': 2,
    '2023-05-06': 9,
    '2023-05-07': 4
  };

  const expected2 = {
    Mon: 5,
    Tue: 10,
    Wed: 3,
    Thu: 7,
    Fri: 2,
    Sat: 9,
    Sun: 4
  };

  const result2 = convertToDayDictionary(D2);
  console.log('Test 2:', dictionariesAreEqual(result2, expected2));

  // Test 3: Input with all days present
  const D3 = {
    '2023-05-01': 5,
    '2023-05-02': 10,
    '2023-05-03': 3,
    '2023-05-04': 7,
    '2023-05-05': 2,
    '2023-05-06': 9,
    '2023-05-07': 4
  };

  const expected3 = {
    Mon: 5,
    Tue: 10,
    Wed: 3,
    Thu: 7,
    Fri: 2,
    Sat: 9,
    Sun: 4
  };

  const result3 = convertToDayDictionary(D3);
  console.log('Test 3:', dictionariesAreEqual(result3, expected3));
}

// Run the unit tests
runUnitTests();
