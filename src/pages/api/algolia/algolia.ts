// import algoliasearch
import algoliasearch from 'algoliasearch';

// Initialize Algolia client
const client = algoliasearch('B6XHF6BHBR', 'bb6543a53546636412489492685a6bc1');
const index = client.initIndex('profiles');

export async function handleAlgoliaUpdate(id: string, data: object) {
  try {
    // Check if object with user's ID exists in Algolia index
    const object = await index
      .search(id, {
        attributesToRetrieve: ['objectID'],
      })
      .then(({ hits }) => {
        return hits[0]?.objectID;
      });

    if (object && id) {
      // Object with user's ID exists, perform partial update
      await index.partialUpdateObject({
        objectID: object,
        ...data,
      });
    } else {
      // Object with user's ID does not exist, create object
      await index.saveObject(data, {
        autoGenerateObjectIDIfNotExist: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const getObjectID = async (query: string): Promise<any> => {
  try {
    const result = await index.search(query, {
      attributesToRetrieve: ['objectID'],
    });
    if (!result.hits.length) {
      console.log('objectID is not sync in Algola');
    } else {
      return result.hits[0]?.objectID;
    }
  } catch (err) {
    throw err;
  }
};

const createObject = async (data: object): Promise<string> => {
  try {
    const result = await index.saveObject(data, {
      autoGenerateObjectIDIfNotExist: true,
    });
    return result.objectID;
  } catch (err) {
    throw err;
  }
};

const partialUpdateObject = async (
  objectID: string,
  data: object
): Promise<string> => {
  try {
    const result = await index.partialUpdateObject({ objectID, ...data });
    return result.objectID;
  } catch (err) {
    throw err;
  }
};

export { createObject, getObjectID, partialUpdateObject };
