import { AbilityBuilder,
   AbilityClass,
   InferSubjects, 
   MongoAbility,
    PureAbility,
     createMongoAbility } from "@casl/ability";


export interface User {
  kind:'User'
  id: string|null
  roleOfUser:string|null 
  
}
export interface UserProfile {
  kind:'UserProfile'
  id: string

  
}

type Actions = 'manage'| 'create' | 'read' | 'update' | 'delete' ;
type Subjects= InferSubjects<User>|'Appraisal'|'Inventory'|'Offers'|'Pdfs'|'FavAppraisal'|InferSubjects<UserProfile>| 'UserType'|'DealershipProfile'|'TrainingVideo'|'Reports'|'DealerPrice'|'ConsumerPrice'|'Payment'|'all' ;


export type AppAbility = MongoAbility<[Actions,Subjects]>;
export const AppAbility = PureAbility as  AbilityClass<AppAbility>;


type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
type Roles = 'member' | 'admin'|'A1'|'A2'|'S1'|'M1'|'C1'|'P1'|'CA'|'D1'|'D2'|'D3';



const rolePermissions: Record<Roles, DefinePermissions> = {
  member(user, { can }) {
    can('create', 'User');
    can('update', 'User', { id: "1" });

   
  },
  admin(user, { can }) {
    can('manage', 'all');
    
  },

   A1(user, {can}){
    can('manage', 'all');
    alert('in A1')
  },

  A2(user, {can, cannot }){
    alert('in A2')
    //Subject: appraisal
    cannot(['create','read','update','delete'],'Appraisal');

    //subject: Inventory
    can('read','Inventory');
    cannot('update','Inventory')
    //subject:Offers
    can('read','Offers')
    cannot('create','Offers'); cannot('update','Offers')
    //subject:pdfs
    cannot('read','Pdfs')
    //subject:user
    
    //subject:FavAppraisal
    can('read','FavAppraisal')
    cannot('create','FavAppraisal'); cannot('delete','FavAppraisal')

    //dealerprofile

    cannot(['create','delete','update'],'DealershipProfile');cannot('update','UserType')
    
    can('read','DealershipProfile')

    //training videoes
    can('read','TrainingVideo'); cannot('create','TrainingVideo')

    //subject:UserProfile own profile
    can('read','UserProfile')
    can('update','UserProfile')
    
    can('read','Reports')
    can('create','DealerPrice')
    cannot('create','ConsumerPrice')
    cannot('create','Payment')
    cannot('read','ConsumerPrice')
    can('read','DealerPrice')



 },

 S1(user, {can,cannot}){
  can('create','Appraisal')
  cannot(['read','update','delete'],'Appraisal') ;

  //subject: Inventory
  can('read','Inventory')
  cannot('update','Inventory')
  //subject:Offers
  can('read','Offers')
  cannot('create','Offers'); cannot('update','Offers')
  //subject:pdfs
  cannot('read','Pdfs')
  //subject:user
  cannot('create','User');cannot('delete','User');cannot('update','UserType')
  //subject:FavAppraisal
  cannot('read','FavAppraisal')
  cannot('create','FavAppraisal'); cannot('delete','FavAppraisal');
  //training videoes
  can('read','TrainingVideo'); cannot('create','TrainingVideo')

  //sub:DealerProfile
  cannot(['create','update','delete','read'],'DealershipProfile');
  cannot('update','UserType')
//subject:UserProfile
  cannot('update','UserProfile'); 
  cannot('read','UserProfile'); 
  cannot('read','Reports')
  can('create','DealerPrice')
  cannot('create','ConsumerPrice')
  cannot('create','Payment')
  cannot('read','ConsumerPrice')
  can('read','DealerPrice')
},

M1(user, {can,cannot}){
  
  can(['create','read','update'],'Appraisal')
  can(['read','update'],'Inventory')

  can('read','Offers')
  cannot('delete','Appraisal');cannot('create','Offers');cannot('update','Offers');
  can('read','Pdfs')
  can(['create','read','delete'],'FavAppraisal')

  cannot('create','User');cannot('delete','User');cannot('update','UserType');

  cannot(['create','delete'],'DealershipProfile');
  cannot('update','UserType')
  can('update','UserProfile',{id:user.id}); cannot('update','DealershipProfile')
  can('read',['UserProfile','DealershipProfile'])
   //training videoes
   can('read','TrainingVideo'); cannot('create','TrainingVideo')
   can('read','Reports')
   can('create','DealerPrice')
   cannot('create','ConsumerPrice')
   cannot('create','Payment')
   cannot('read','ConsumerPrice')
   can('read','DealerPrice')
},

C1(user, {can,cannot}){
  can(['create','read','update','delete'],['Appraisal','Inventory','Offers','Pdfs','User','UserType','FavAppraisal','DealershipProfile','UserProfile'])
 //training videoes
 can('read','TrainingVideo'); cannot('create','TrainingVideo')
 can('read','Reports')
 can('create','DealerPrice')
 cannot('create','ConsumerPrice')
 cannot('create','Payment')
 cannot('read','ConsumerPrice')
    can('read','DealerPrice')
},

P1(user, {can,cannot}){
  can(['create','read','update','delete'],['Appraisal','Inventory','Offers','Pdfs','User','UserType','FavAppraisal','DealershipProfile','UserProfile'])
  

  can(['read','update'],'UserProfile',{id:user.id});cannot('update','DealershipProfile');cannot('read','DealershipProfile')
  cannot(['create','delete'],'DealershipProfile');
  cannot('update','UserType')
   //training videoes
   can('read','TrainingVideo'); cannot('create','TrainingVideo');
   cannot('read','Reports');
   cannot('create','DealerPrice')
   cannot('read','DealerPrice')
   can('create','ConsumerPrice')
   can('read','ConsumerPrice')
   can('create','Payment')
},

CA(user, {can,cannot}){
 //training videoes
 can('read','TrainingVideo'); cannot('create','TrainingVideo')
 can('read','Reports');
 can('create','DealerPrice')
 cannot('create','ConsumerPrice')
 cannot('create','Payment')
 cannot('read','ConsumerPrice')
 can('read','DealerPrice')
},

D1(user, {can,cannot}){
 
  can(['create','read','update','delete'],['Appraisal','Inventory','Offers','Pdfs','User','UserType','FavAppraisal','DealershipProfile','UserProfile'])
  
 //training videoes
 can('read','TrainingVideo'); cannot('create','TrainingVideo');
 can('read','Reports')
 can('create','DealerPrice')
 cannot('create','ConsumerPrice')
 cannot('create','Payment')
 cannot('read','ConsumerPrice')
 can('read','DealerPrice')

},

D2(user, {can,cannot}){
  can(['create','read','update','delete'],['Appraisal','Inventory','Offers','Pdfs','User','UserType','FavAppraisal','DealershipProfile','UserProfile'])
 //training videoes
 can('read','TrainingVideo'); cannot('create','TrainingVideo');
 can('read','Reports');
 can('create','DealerPrice')
 cannot('create','ConsumerPrice')
 cannot('create','Payment')
 cannot('read','ConsumerPrice')
    can('read','DealerPrice')
},

D3(user, {can,cannot}){
  can(['create','read','update','delete'],['Appraisal','Inventory','Offers','Pdfs','User','UserType','FavAppraisal','DealershipProfile','UserProfile'])
 //training videoes
 can('read','TrainingVideo'); cannot('create','TrainingVideo');
 can('read','Reports');
 can('create','DealerPrice')
 cannot('create','ConsumerPrice')
 cannot('create','Payment')
 
},

};

//for update the rules call this function beacuse this is returing rule       this.ability.update(defineAbilitiesFor(user))
export function defineAbilityFor(user: User) {
 
 
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user!.roleOfUser ==='member' && typeof rolePermissions.member === 'function') {
    rolePermissions.member(user, builder);
  } 
  else if(user && user!.roleOfUser  ==='admin'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.admin(user, builder);
  }
  else if(user && user!.roleOfUser==='A1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.A1(user, builder);
  }
  else if(user && user!.roleOfUser ==='A2'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.A2(user, builder);
  }
  else if(user && user!.roleOfUser ==='S1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.S1(user, builder);
  }
  else if(user && user!.roleOfUser ==='M1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.M1(user, builder);
  }
  else if(user && user!.roleOfUser ==='C1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.C1(user, builder);
  }
  else if(user && user!.roleOfUser ==='P1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.P1(user, builder);
  }
  else if(user && user!.roleOfUser==='CA'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.CA(user, builder);
  }
  else if(user && user!.roleOfUser ==='D1'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.D1(user, builder);
  }
  else if(user && user!.roleOfUser==='D2'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.D2(user, builder);
  }
  else if(user && user!.roleOfUser==='D3'&& typeof rolePermissions.admin === 'function'){
    rolePermissions.D3(user, builder);
  }
 
  else {
    throw new Error(`Trying to use unknown role "${user.roleOfUser}"`);
  }

  return builder.rules;
}


//for very first time this function is called by ng then we need to update rule base on login user


export function createAbility() :AppAbility{

  return createMongoAbility(defineAbilityFor({
    kind: "User",
    id: "1",
    roleOfUser: "member"
    
    
  }), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: object => object['kind'],
  });
}




