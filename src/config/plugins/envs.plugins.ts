import * as env from 'env-var';

export const envs = {

    PORT              : env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE    : env.get('MAILER_SERVICE').required().asString(),
    MAILER_MAIL       : env.get('MAILER_MAIL').required().asEmailString(),
    MAILER_SECRET_KEY : env.get('MAILER_SECRET_KEY').required().asString(),
    PROD              : env.get('PROD').required().asBool(),
    
}