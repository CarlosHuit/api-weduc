const MONGODB_URI_SERVER = process.env.MONGODB_URI || 'mongodb://emox2544:mX179zAzA@ds161104.mlab.com:61104/weduc-api';
// const MONGODB_URI_SERVER = process.env.MONGODB_URI || 'mongodb://emox2544:mX179zAzA@ds141661.mlab.com:41661/weduc';
const MONGODB_URI_LOCAL  = process.env.MONGODB_URI || 'mongodb://localhost/weduc1';
// mongo ds141661.mlab.com:41661/weduc -u emox2544 -p mX179zA
const PORT_SERVER = process.env.PORT || 8000;
const PORT_LOCAL  = process.env.PORT || 3000;

export const nameProject = 'WEDUC';
export const secret      = process.env.SECRET || 'mi clave secreta';
export const port        = process.env.NODE_ENV === 'production' ? PORT_SERVER        : PORT_LOCAL;
export const mongoURL    = process.env.NODE_ENV === 'production' ? MONGODB_URI_SERVER : MONGODB_URI_LOCAL;
